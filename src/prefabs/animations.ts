import Phaser from "phaser";

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

export function buildAnimations(scene: Phaser.Scene) {
  scene.anims.create({
    key: "slashing",
    frames: scene.anims.generateFrameNumbers("slash", {
      frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    }),
    frameRate: 48,
    repeat: 0,
  });
}

function playSlash(scene: Phaser.Scene) {
  const slashAnim = scene.add.sprite(
    GAME_WIDTH / 2,
    GAME_HEIGHT / 2 - 172,
    "slash"
  );
  slashAnim.setScale(0.5);
  slashAnim.play("slashing");
  slashAnim.on(
    Phaser.Animations.Events.ANIMATION_COMPLETE,
    () => {
      slashAnim.destroy();
    },
    scene
  );
}

export function animationHandler(scene: Phaser.Scene, name: string) {
  playSlash(scene);
}
