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

  scene.anims.create({
    key: "multi slashing",
    frames: scene.anims.generateFrameNumbers("multi slash", {
      frames: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
      ],
    }),
    frameRate: 16,
    repeat: 0,
  });

  scene.anims.create({
    key: "healing",
    frames: scene.anims.generateFrameNumbers("heal", {
      frames: [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
        38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
      ],
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

export function playHeal(scene: Phaser.Scene, xPos: number, yPos: number) {
  const healAnim = scene.add.sprite(xPos - 4, yPos - 4, "heal");
  healAnim.setScale(0.25);
  healAnim.play("healing");
  healAnim.on(
    Phaser.Animations.Events.ANIMATION_COMPLETE,
    () => {
      healAnim.destroy();
    },
    scene
  );
}

function playMulti(scene: Phaser.Scene) {
  const multiAnim = scene.add.sprite(
    GAME_WIDTH / 2,
    GAME_HEIGHT / 2,
    "multi slash"
  );
  multiAnim.setScale(0.5);
  multiAnim.play("multi slashing");
  multiAnim.on(
    Phaser.Animations.Events.ANIMATION_COMPLETE,
    () => {
      multiAnim.destroy();
    },
    scene
  );
}

export function animationHandler(scene: Phaser.Scene, name: string) {
  if (name == "charged strikes") {
    playMulti(scene);
  } else {
    playSlash(scene);
  }
}
