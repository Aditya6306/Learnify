export const dummyResponses = {
  
  "/auth/login": {
    token: "dummy-token-123",
    user: {
      id: 1,
      name: "Shivang",
      email: "shivang@gmail.com"
    }
  },

  "/auth/signup": {
    success: true,
    message: "Signup successful"
  },

  "/courses": [
    {
      id: 1,
      title: "DSA Course",
      price: 999
    },
    {
      id: 2,
      title: "React Course",
      price: 799
    }
  ],

};