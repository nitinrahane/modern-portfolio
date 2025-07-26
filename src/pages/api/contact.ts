import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();
    
    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Here you would integrate with your email service
    // Examples: SendGrid, Resend, EmailJS, or SMTP
    
    // For now, we'll simulate a successful response
    // In production, replace this with actual email sending logic
    
    console.log('Contact form submission:', {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone || '',
      message: formData.message,
      timestamp: new Date().toISOString()
    });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Replace with actual email service integration
    // Example with SendGrid:
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: 'nitinrahane@email.com',
      from: 'noreply@yourwebsite.com',
      subject: `New Contact Form Submission from ${formData.firstName} ${formData.lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${formData.message}</p>
      `
    };
    
    await sgMail.send(msg);
    */

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully!' 
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send message. Please try again.' 
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
