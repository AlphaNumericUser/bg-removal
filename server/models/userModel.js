import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  creditBalance: { type: Number, default: 5 },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

// Función para actualizar los créditos del usuario
export const updateCredits = async (userId, credits) => {
  try {
    const user = await userModel.findById(userId);
    if (user) {
      user.creditBalance += credits;
      await user.save();
    } else {
      throw new Error('Usuario no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar los créditos:', error);
    throw error;
  }
};

export default userModel;