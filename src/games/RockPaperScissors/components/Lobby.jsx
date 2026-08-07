import { SettingsForm } from "./SettingsForm";
import { StartGameButton } from "./StartGameButton";

export const LobbyView = ({ settings, setSettings, onStart }) => {

  return (
    <section aria-labelledby="settings-heading" className="card">
      <h2 id="settings-heading">Player Settings Lobby</h2>

      <div role="status" aria-live="polite" data-testid="greeting">
        {getGreeting(settings?.name)}
      </div>

      <SettingsForm settings={settings} onSave={setSettings} />

      <StartGameButton
        disabled={settings === null || !settings.name || !settings.avatar}
        onStart={onStart}
      />
    </section>
  );
};

function getGreeting(name) {
  let greeting = "";
  if (typeof name === "string" && name.trim() !== "") {
    greeting = `Welcome, ${name}!`;
  }
  return greeting;
}
