/* Credits Scene: Lists all of the contributors to the game, essentially, the team
 * Should lead back to the title scene
 */

import Phaser from "phaser";

export class Credits extends Phaser.Scene {
  constructor() {
    super("credits");
  }

  preload() {}

  create() {
    // Test code for scene transition remove
    console.log("Credits Scene Loaded");
  }

  update() {}
}
