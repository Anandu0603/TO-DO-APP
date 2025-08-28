// This file will define the User model and interact with Supabase for user-related operations.
// Supabase handles user authentication directly, so this model will primarily focus on
// any additional user profile data if needed, or simply serve as a conceptual representation.

// For now, we'll keep it simple as Supabase manages the core user data.
// If you need to store additional user-specific data (e.g., preferences, profile info),
// you would create a 'profiles' table in Supabase and interact with it here.

class User {
  constructor(id, email) {
    this.id = id;
    this.email = email;
  }

  // In a typical application, you might have methods like findById, findByEmail, etc.
  // However, with Supabase Auth, many of these operations are handled by the Supabase client itself.
  // This class can be extended if you introduce a 'profiles' table for custom user data.
}

module.exports = User;
