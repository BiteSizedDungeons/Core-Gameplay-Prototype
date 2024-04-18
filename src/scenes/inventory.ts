/* Inventory Scene: Allows the player to make changes to their character's kit
 * should have a button that leads players back to the Post Combat Scene.
 */

import Phaser from "phaser";

export class Inventory extends Phaser.Scene {
  constructor() {
    super("inventory");
  }

  preload() {}

  create() {
    // Test code for scene transition remove
    console.log("Inventory Scene Loaded");
  }

  update() {}
}
