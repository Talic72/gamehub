const API_URL = "https://game-room-api.fly.dev/api/rooms";

export async function createRoom(initialState) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      initialState,
    }),
  });

  return await response.json();
}

export async function getRoom(roomId) {
  const response = await fetch(`${API_URL}/${roomId}`);

  return await response.json();
}

export async function updateRoom(roomId, gameState) {
  const response = await fetch(`${API_URL}/${roomId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameState,
    }),
  });

  return await response.json();
}