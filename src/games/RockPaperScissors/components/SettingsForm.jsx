import { saveSettings } from "../logic/settings";
import { AvatarSelector } from "./AvatarSelector";

export function SettingsForm({ settings, onSave }) {
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const {
      "player-name": name,
      avatar,
      difficulty,
      themeToggle,
    } = Object.fromEntries(formData.entries());

    const newSettings = {
      name,
      avatar,
      difficulty,
      darkMode: !!themeToggle,
    };
    saveSettings(newSettings);
    onSave(newSettings);
  }

  return (
    <form id="settings-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="player-name">Player Name</label>
        <input
          id="player-name"
          name="player-name"
          required
          minLength={2}
          maxLength={15}
          value={settings?.name || ""}
          readOnly
        />
      </div>

      <AvatarSelector selectedAvatar={settings?.avatar}/>

      <div className="field">
        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" name="difficulty" defaultValue={settings?.difficulty}>
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="field checkbox">
        <label>
          Dark Theme
          <input
            type="checkbox"
            id="theme-toggle"
            name="themeToggle"
            value="dark"
            defaultChecked={settings?.darkMode}
          />
        </label>
      </div>

      <button id="save-settings" type="submit">
        Save Settings
      </button>
    </form>
  );
}
