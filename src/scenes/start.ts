const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

const TEXT_COLOR = "#D3B02C";
const FONT = "Silkscreen";

export class Start extends Phaser.Scene {
  english: any;
  not_english: any;
  korean: any;
  language: any;
  ability: any = [];
  weapon: any = [];
  armor: any = [];
  isStart: boolean = false;
  abilityRect: Phaser.GameObjects.Graphics[];
  weaponRect: Phaser.GameObjects.Graphics[];
  armorRect: Phaser.GameObjects.Graphics[];

  constructor() {
    super("Start");

    this.abilityRect = [];
    this.weaponRect = [];
    this.armorRect = [];
  }

  preload() {
    this.load.image("dragon", "BSD_Dead_Dragon.png");
    this.load.image("dragonLogo", "8_bit_dragon.png");
    this.load.json("english", "en.json");
    this.load.json("not_english", "lang.json");
    this.load.json("korean", "kr.json");
    this.load.audio("btnHov", "btn_hover.mp3");
  }

  create() {      
    const hover = this.sound.add("btnHov");
    this.english = this.cache.json.get("english");
    this.not_english = this.cache.json.get("not_english");
    this.korean = this.cache.json.get("korean");
    this.setLanguage(); // set language
    
    console.log("Start");

    this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT / 2,
      GAME_WIDTH,
      GAME_HEIGHT,
      0x141413
    );

    this.initText();
    this.initButton(hover);
    this.initRect();
   

    const class1 = this.add
      .text(1100, 650, "Start Game", {
        fontFamily: FONT,
        color: TEXT_COLOR,
        fontSize: "30px",
      })
      .setOrigin(0.5);
    class1.setInteractive();
    class1.on("pointerover", () => {
      class1.setColor("#FFF");
      hover.play();
    });
    class1.on("pointerout", () => {
      class1.setColor(TEXT_COLOR);
    });
    class1.on("pointerdown", () => {
      if(this.isStart){
        let player = {
          "Ability": [this.ability[0], this.ability[1], this.ability[2], this.ability[3]],
          "Weapon": this.weapon[0],
          "Armor": this.armor[0]
        }
        console.log(JSON.stringify(player));
        // send player to server
        // this.scene.start("Combat");
      }
    });
  }

  initText() {
    this.add
    .text(50, 50, "Ability:", {
      fontFamily: "Silkscreen",
      color: "#D3B02C",
      fontSize: "30px",
    });

    this.add
    .text(50, 300, "Weapon:", {
      fontFamily: "Silkscreen",
      color: "#D3B02C",
      fontSize: "30px",
    });

    this.add
    .text(50, 450, "Armor:", {
      fontFamily: "Silkscreen",
      color: "#D3B02C",
      fontSize: "30px",
    });
  }

  initButton(hover:any) {
    const ability1 = "a1",
          ability2 = "a2",
          ability3 = "a3",
          ability4 = "a4",
          ability5 = "a5",
          ability6 = "a6",
          ability7 = "a7",
          ability8 = "a8";
    
    const weapon1 = "w1",
          weapon2 = "w2",
          weapon3 = "w3",
          weapon4 = "w4";
    
    const armor1 = "m1",
          armor2 = "m2",
          armor3 = "m3",
          armor4 = "m4";

    this.createAbilityButton(ability1, 250, 150, hover);
    this.createAbilityButton(ability2, 500, 150, hover);
    this.createAbilityButton(ability3, 750, 150, hover);
    this.createAbilityButton(ability4, 1000, 150, hover);
    this.createAbilityButton(ability5, 250, 230, hover);
    this.createAbilityButton(ability6, 500, 230, hover);
    this.createAbilityButton(ability7, 750, 230, hover);
    this.createAbilityButton(ability8, 1000, 230, hover);

    this.createWeaponButton(weapon1, 250, 400, hover);
    this.createWeaponButton(weapon2, 500, 400, hover);
    this.createWeaponButton(weapon3, 750, 400, hover);
    this.createWeaponButton(weapon4, 1000, 400, hover);

    this.createArmorButton(armor1, 250, 550, hover);
    this.createArmorButton(armor2, 500, 550, hover);
    this.createArmorButton(armor3, 750, 550, hover);
    this.createArmorButton(armor4, 1000, 550, hover);

  }

  createAbilityButton(text:any, x:any, y:any, hover:any) {
    const class1 = this.add
      .text(x, y, text, {
        fontFamily: FONT,
        color: TEXT_COLOR,
        fontSize: "30px",
      })
      .setOrigin(0.5);
    class1.setInteractive();
    class1.on("pointerover", () => {
      class1.setColor("#FFF");
      hover.play();
    });
    class1.on("pointerout", () => {
      class1.setColor(TEXT_COLOR);
    });
    class1.on("pointerdown", () => {
      if (!this.ability.includes(text))
        this.ability.push(text);

      if(this.ability.length > 4)
        this.ability.shift();

      this.hideRect();
      this.showRect();
  
      this.startOrNot();
    });
    
  }

  createWeaponButton(text:any, x:any, y:any, hover:any) {
    const class1 = this.add
      .text(x, y, text, {
        fontFamily: FONT,
        color: TEXT_COLOR,
        fontSize: "30px",
      })
      .setOrigin(0.5);
    class1.setInteractive();
    class1.on("pointerover", () => {
      class1.setColor("#FFF");
      hover.play();
    });
    class1.on("pointerout", () => {
      class1.setColor(TEXT_COLOR);
    });
    class1.on("pointerdown", () => {
      this.weapon[0] = text;

      this.hideRect();
      this.showRect();

      this.startOrNot();
    });
  }

  createArmorButton(text:any, x:any, y:any, hover:any) {
    const class1 = this.add
      .text(x, y, text, {
        fontFamily: FONT,
        color: TEXT_COLOR,
        fontSize: "30px",
      })
      .setOrigin(0.5);
    class1.setInteractive();
    class1.on("pointerover", () => {
      class1.setColor("#FFF");
      hover.play();
    });
    class1.on("pointerout", () => {
      class1.setColor(TEXT_COLOR);
    });
    class1.on("pointerdown", () => {
      this.armor[0] = text

      this.hideRect();
      this.showRect();
      
      this.startOrNot();
    });
  }

  initRect() {
    for(let i = 0; i < 8; i++) {
      this.abilityRect[i] = this.add.graphics();
    }
    this.createRect(this.abilityRect[0], 175, 130);
    this.createRect(this.abilityRect[1], 425, 130);
    this.createRect(this.abilityRect[2], 675, 130);
    this.createRect(this.abilityRect[3], 925, 130);
    this.createRect(this.abilityRect[4], 175, 210);
    this.createRect(this.abilityRect[5], 425, 210);
    this.createRect(this.abilityRect[6], 675, 210);
    this.createRect(this.abilityRect[7], 925, 210);

    for(let i = 0; i < 4; i++) {
      this.weaponRect[i] = this.add.graphics();
    }
    this.createRect(this.weaponRect[0], 175, 380);
    this.createRect(this.weaponRect[1], 425, 380);
    this.createRect(this.weaponRect[2], 675, 380);
    this.createRect(this.weaponRect[3], 925, 380);

    for(let i = 0; i < 4; i++) {
      this.armorRect[i] = this.add.graphics();
    }
    this.createRect(this.armorRect[0], 175, 530);
    this.createRect(this.armorRect[1], 425, 530);
    this.createRect(this.armorRect[2], 675, 530);
    this.createRect(this.armorRect[3], 925, 530); 

    this.hideRect();
  }

  createRect(graphics:any, x:any, y:any) {
    graphics.lineStyle(1, 0xffffff, 1);
    graphics.strokeRect(x, y, 150, 50);
  }

  hideRect() {
    for(let i = 0; i < 8; i++) {
      this.abilityRect[i].visible = false;
    }

    for(let i = 0; i < 4; i++) {
      this.weaponRect[i].visible = false;
    }

    for(let i = 0; i < 4; i++) {
      this.armorRect[i].visible = false;
    }
  }

  showRect() {
    const ability1 = "a1",
          ability2 = "a2",
          ability3 = "a3",
          ability4 = "a4",
          ability5 = "a5",
          ability6 = "a6",
          ability7 = "a7",
          ability8 = "a8";

    const weapon1 = "w1",
          weapon2 = "w2",
          weapon3 = "w3",
          weapon4 = "w4";

    const armor1 = "m1",
          armor2 = "m2",
          armor3 = "m3",
          armor4 = "m4";

    for(let i = 0; i < this.ability.length; i++){
      if(this.ability[i] == ability1)
        this.abilityRect[0].visible = true;
      else if(this.ability[i] == ability2)
        this.abilityRect[1].visible = true;
      else if(this.ability[i] == ability3)
        this.abilityRect[2].visible = true;
      else if(this.ability[i] == ability4)
        this.abilityRect[3].visible = true;
      else if(this.ability[i] == ability5)
        this.abilityRect[4].visible = true;
      else if(this.ability[i] == ability6)
        this.abilityRect[5].visible = true;
      else if(this.ability[i] == ability7)
        this.abilityRect[6].visible = true;
      else if(this.ability[i] == ability8)
        this.abilityRect[7].visible = true;
    }

    if(this.weapon[0] == weapon1)
      this.weaponRect[0].visible = true;
    else if(this.weapon[0] == weapon2)
      this.weaponRect[1].visible = true;
    else if(this.weapon[0] == weapon3)
      this.weaponRect[2].visible = true;
    else if(this.weapon[0] == weapon4)
      this.weaponRect[3].visible = true;

    if(this.armor[0] == armor1)
      this.armorRect[0].visible = true;
    else if(this.armor[0] == armor2)
      this.armorRect[1].visible = true;
    else if(this.armor[0] == armor3)
      this.armorRect[2].visible = true;
    else if(this.armor[0] == armor4)
      this.armorRect[3].visible = true;
  }

  setLanguage() {
    if (localStorage.getItem("language")!) {
      let get_lang = localStorage.getItem("language")!;
      if (get_lang === "not_english") {
        this.language = this.not_english;
      } else if (get_lang === "korean") {
        this.language = this.korean;
      } else {
        this.language = this.english;
      }
    } else {
      this.language = this.english;
    }
  }

  startOrNot() {
    if(this.ability.length == 4 && this.weapon.length == 1 && this.armor.length == 1)
      this.isStart = true;
  }

  update() {}
}
