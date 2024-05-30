import * as Phaser from 'phaser';

export class Tutorial extends Phaser.Scene {
    constructor() {
        super('Tutorial');
    }

    preload() {
        //this.load.image("testImg", "test.png");
    }

    create() {
        this.cameras.main.setBackgroundColor(0x141413);

        const tutorialText = `
            Welcome to the adventure of Bite-Sized Dungeons! In this game, you will play as a brave hero who gains strength by defeating various bosses, acquiring better weapons, armor, and enchantments. Here is a detailed tutorial to help you get started quickly.

            I. Game Basics
            Game Type: Adventure/Strategy
            Main Goal: Defeat five powerful bosses to enhance your abilities and ultimately become the strongest hero.

            II. Main Gameplay
            1. Choose Your Character: At the start of the game, you can select a character to play.
            2. Select Teammates: Choose three teammates from server saves to join you on your adventure.
            3. Combat System: In each battle, you can choose four different enchantments to attack with.
            4. Gain Upgrades: By defeating bosses, you will acquire stronger weapons, armor, and new enchantments.

            III. Game Controls
            Movement: Use the arrow keys or WASD keys to move.
            Select Enchantment: Use the number keys 1-4 to select an enchantment.
            Attack: Press the spacebar to attack.
            Menu Navigation: Use the mouse to click on menu options for navigation.

            IV. Starting the Game
            1. Launch the Game: Enter the game menu and click the "Join Room" button to start the game.
            2. Choose a Character: In the character selection screen, choose a character to start your adventure. You can choose from the following four types:
               - All-Rounder: Balanced attributes, suitable for various combat situations.
               - Bruiser: High attack and defense, suitable for close combat.
               - Striker: High attack and speed, suitable for quick kills.
               - Supporter: Provides various buffs and healing effects, assisting teammates in combat.

            V. Combat Guide
            1. Enter Combat: When you enter a new battle scene, you will face a powerful boss.
            2. Choose Enchantment: Before the battle begins, you can choose four different enchantments as your means of attack.
            3. Attack Enemies: Select the appropriate enchantment and attack to reduce the enemy's health points.
            4. Manage Equipment: In the "Inventory" interface, you can view and manage your equipment. Choose the equipment and enchantments that are best suited for the current battle to enhance your combat effectiveness.
            5. Defeat Bosses: Each time you defeat a boss, you will receive new weapons, armor, and enchantments.
        `;

        const textStyle = {
            fontFamily: 'Silkscreen',
            color: '#D3B02C',
            fontSize: '16px',
            wordWrap: { width: this.cameras.main.width - 50 }
        };

        this.add.text(25, 25, tutorialText, textStyle).setOrigin(0);

        // const center_x = this.game.canvas.width / 2;
        // const center_y = this.game.canvas.height / 2;
        // this.add.image(center_x, center_y - 175 + 100, "testImg")
        //     .setScale(0.35)
        //     .setOrigin(0.5)
        //     .setVisible(true);

        const backButton = this.add.text(this.cameras.main.width / 2, this.cameras.main.height - 50, 'Back to Menu', {
            fontFamily: 'Bangers',
            color: '#D3B02C',
            fontSize: '35px'
        }).setOrigin(0.5);

        backButton.setInteractive();
        backButton.on('pointerover', () => {
            backButton.setColor('#FFF');
        });
        backButton.on('pointerout', () => {
            backButton.setColor('#D3B02C');
        });
        backButton.on('pointerdown', () => {
            this.scene.start('menu');
        });
    }

    update() {
    }
}
