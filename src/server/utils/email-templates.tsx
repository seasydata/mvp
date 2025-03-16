export const emailTemplates = {
    emissionRecord: (name: string) => `
      <html>
        <body>
          <h1>Welcome, ${name}!</h1>
          <p>Your account has been created successfully. 🎉</p>
        </body>
      </html>
    `,
  };