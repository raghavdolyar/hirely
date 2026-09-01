import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, 'token is required to be added in blacklist'],
    },
  },
  {
    timestamps: true,
  },
);

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);

export default BlacklistToken;
