// Test script to check Sanity connection and debug blog posts
require('dotenv').config({ path: '.env.local' });

console.log('=== SANITY DEBUG TEST ===');
console.log('Environment variables:');
console.log('NEXT_PUBLIC_SANITY_PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('NEXT_PUBLIC_SANITY_DATASET:', process.env.NEXT_PUBLIC_SANITY_DATASET);
console.log('NEXT_PUBLIC_SANITY_API_VERSION:', process.env.NEXT_PUBLIC_SANITY_API_VERSION);

// Let's also check what's in the studio config
console.log('\n=== CHECKING STUDIO CONFIG ===');
try {
  const fs = require('fs');
  const sanityConfig = fs.readFileSync('./sanity.config.js', 'utf8');
  console.log('Sanity config file exists and is readable');
  
  // Check if there are any hardcoded values
  if (sanityConfig.includes('z8wach2n')) {
    console.log('✅ Project ID found in sanity.config.js');
  } else {
    console.log('❌ Project ID not found in sanity.config.js');
  }
} catch (e) {
  console.log('❌ Could not read sanity.config.js:', e.message);
}

// Test with the @sanity/client directly
const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-23',
  useCdn: false, // Use false for testing to get fresh data
});

async function testConnection() {
  try {
    console.log('\n=== TESTING SANITY CONNECTION ===');
    
    // Test basic connection
    console.log('1. Testing basic connection...');
    const posts = await client.fetch('*[_type == "post"]');
    console.log('   Found posts:', posts.length);
    console.log('   Posts:', JSON.stringify(posts, null, 2));
    
    // Test with a simpler query
    console.log('\n2. Testing post count...');
    const count = await client.fetch('count(*[_type == "post"])');
    console.log('   Post count:', count);
    
    // Test for any document types
    console.log('\n3. Testing all document types...');
    const allDocs = await client.fetch('*[_type]');
    const docTypes = [...new Set(allDocs.map(doc => doc._type))];
    console.log('   All document types:', docTypes);
    console.log('   Total documents:', allDocs.length);
    
    // Test for drafts
    console.log('\n4. Testing for draft posts...');
    const draftPosts = await client.fetch('*[_id in path("drafts.**")]');
    console.log('   Draft posts:', draftPosts.length);
    if (draftPosts.length > 0) {
      console.log('   Draft posts details:', JSON.stringify(draftPosts, null, 2));
    }
    
    // Test with production dataset if current is not production
    if (process.env.NEXT_PUBLIC_SANITY_DATASET !== 'production') {
      console.log('\n5. Testing with production dataset...');
      const prodClient = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: 'production',
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-23',
        useCdn: false,
      });
      
      const prodPosts = await prodClient.fetch('*[_type == "post"]');
      console.log('   Posts in production dataset:', prodPosts.length);
      if (prodPosts.length > 0) {
        console.log('   Production posts:', JSON.stringify(prodPosts, null, 2));
      }
      
      const prodAllDocs = await prodClient.fetch('*[_type]');
      const prodDocTypes = [...new Set(prodAllDocs.map(doc => doc._type))];
      console.log('   Production document types:', prodDocTypes);
      console.log('   Total production documents:', prodAllDocs.length);
    }
    
    // Test with dev dataset if current is not dev
    if (process.env.NEXT_PUBLIC_SANITY_DATASET !== 'dev') {
      console.log('\n6. Testing with dev dataset...');
      const devClient = createClient({
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: 'dev',
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-23',
        useCdn: false,
      });
      
      const devPosts = await devClient.fetch('*[_type == "post"]');
      console.log('   Posts in dev dataset:', devPosts.length);
      if (devPosts.length > 0) {
        console.log('   Dev posts:', JSON.stringify(devPosts, null, 2));
      }
      
      const devAllDocs = await devClient.fetch('*[_type]');
      const devDocTypes = [...new Set(devAllDocs.map(doc => doc._type))];
      console.log('   Dev document types:', devDocTypes);
      console.log('   Total dev documents:', devAllDocs.length);
    }
    
    // Test specific query that the blog uses
    console.log('\n7. Testing blog query...');
    const blogPosts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        author->{
          name,
          image
        },
        mainImage,
        categories[]->{
          title,
          slug
        },
        readingTime
      }
    `);
    console.log('   Blog query results:', JSON.stringify(blogPosts, null, 2));
    
    // Test if we can get project info
    console.log('\n8. Testing project information...');
    try {
      const projectInfo = await client.fetch('*[_type == "sanity.projectSettings"][0]');
      console.log('   Project settings:', projectInfo);
    } catch (e) {
      console.log('   No project settings found (this is normal)');
    }
    
    // Test with a very broad query to see if there's ANY content
    console.log('\n9. Testing with very broad query...');
    const everything = await client.fetch('*');
    console.log('   Everything in dataset:', everything.length);
    if (everything.length > 0) {
      console.log('   Sample content:', JSON.stringify(everything[0], null, 2));
    }
    
    // Test for posts with different possible names
    console.log('\n10. Testing for posts with different document types...');
    const possibleTypes = ['post', 'Post', 'blog', 'Blog', 'article', 'Article'];
    for (const type of possibleTypes) {
      try {
        const posts = await client.fetch(`*[_type == "${type}"]`);
        if (posts.length > 0) {
          console.log(`   Found ${posts.length} documents of type "${type}"`);
          console.log(`   Sample:`, JSON.stringify(posts[0], null, 2));
        }
      } catch (e) {
        // Ignore errors for non-existent types
      }
    }
    
    // Test for documents that might contain "tesitng" in the title
    console.log('\n11. Testing for documents with "tesitng" in title...');
    try {
      const matchingDocs = await client.fetch('*[title match "*tesitng*"]');
      console.log('   Documents with "tesitng" in title:', matchingDocs.length);
      if (matchingDocs.length > 0) {
        console.log('   Matching documents:', JSON.stringify(matchingDocs, null, 2));
      }
    } catch (e) {
      console.log('   Error searching for "tesitng":', e.message);
    }
    
    // Test with different API versions
    console.log('\n12. Testing with different API versions...');
    const apiVersions = ['2025-09-23', '2024-10-01', '2023-12-01', '2023-05-03'];
    for (const version of apiVersions) {
      try {
        const testClient = createClient({
          projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
          dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
          apiVersion: version,
          useCdn: false,
        });
        const posts = await testClient.fetch('*[_type == "post"]');
        if (posts.length > 0) {
          console.log(`   Found ${posts.length} posts with API version ${version}`);
          break;
        }
      } catch (e) {
        // Ignore errors for unsupported versions
      }
    }
    
  } catch (error) {
    console.error('❌ Connection test failed:', error);
    console.error('Error details:', error.message);
    console.error('Full error:', error);
  }
}

testConnection();
