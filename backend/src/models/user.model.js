const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // معلومات الحساب الأساسية
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // هيتخزن Hash
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // لـ OAuth (عشان الـ Google/LinkedIn Login اللي في السكرينات)
  googleId: String,
  linkedinId: String,
  
  // إدارة الاشتراك (من سكرينة الـ Billing)
  subscription: {
    plan: { type: String, enum: ['free', 'pro', 'expert'], default: 'free' },
    status: { type: String, enum: ['active', 'canceled', 'expired'], default: 'active' },
    stripeCustomerId: String // لو هتستخدم Stripe مستقبلاً
  },

  // إعدادات الحساب (من سكرينة الـ Account Settings)
  profilePicture: String,
  notifications: {
    emailUpdates: { type: Boolean, default: true },
    marketingAlerts: { type: Boolean, default: false },
    aiResumeTips: { type: Boolean, default: true }
  },
  refreshToken: String
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password validity
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);