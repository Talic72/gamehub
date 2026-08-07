import { avatars } from "../logic/avatars";

export function AvatarSelector({ selectedAvatar }) {
  return (
    <fieldset>
      <legend>Choose your avatar</legend>

      <div className="avatar-options">
        {avatars.map((avatar) => (
          <label key={avatar.key} className="avatar-option">
            <input
              type="radio"
              name="avatar"
              defaultValue={avatar.key}
              defaultChecked={selectedAvatar === avatar.key}
            />
            <img src={avatar.image} alt={avatar.key} />
            {avatar.key}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
