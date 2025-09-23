'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      // Mailchimp API integration
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing! Check your email to confirm your subscription.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Stay Updated
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get the latest updates, tutorials, and component releases delivered straight to your inbox.
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Join Our Newsletter</CardTitle>
              <CardDescription className="text-base">
                Be the first to know about new components, updates, and Shopify development tips.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                    disabled={status === 'loading'}
                  />
                  <Button 
                    type="submit" 
                    disabled={status === 'loading' || !email}
                    className="sm:w-auto"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </div>

                {message && (
                  <div className={`flex items-center space-x-2 text-sm ${
                    status === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {status === 'success' ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <span>{message}</span>
                  </div>
                )}
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">📧</span>
              </div>
              <h3 className="font-semibold">Weekly Updates</h3>
              <p className="text-sm text-muted-foreground">
                Get curated content and updates every week
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">🚀</span>
              </div>
              <h3 className="font-semibold">Early Access</h3>
              <p className="text-sm text-muted-foreground">
                Be the first to try new components and features
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-bold text-primary">💡</span>
              </div>
              <h3 className="font-semibold">Expert Tips</h3>
              <p className="text-sm text-muted-foreground">
                Learn best practices from Shopify experts
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
