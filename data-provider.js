/**
 * Mantra Lab data-provider contract.
 * The UI never depends directly on a specific source.
 * A future authorized online provider can implement:
 *   loadPlayers() -> Promise<Player[]>
 *
 * Player shape:
 * {
 *   id, name, team, classicRole, mantraRoles: [],
 *   price, image, stats: { presences, mv, fm, goals, assists, yellow, red }
 * }
 */
window.MantraLabDataProvider = {
  async loadPlayers() {
    throw new Error("Online provider not configured. Use CSV/JSON import.");
  }
};
