import { Player, Character } from "./characterElements";

export enum SkillType {
  TargetEnemy,
  TargetAlly,
}

export interface Skill {
  name: string;
  type: SkillType;
  description: string;
  actRate: number;
  effect(source: Player, target: Character): void;
}

export const skillList: Map<string, Skill> = new Map();

function modDamage(player: Player, n: number): number {
  if (player.hasBuff("Attack")) {
    return n * 1.5 + 10;
  } else {
    return n;
  }
}

class basicAttack implements Skill {
  public name = "attack";
  public type = SkillType.TargetEnemy;
  public description = "Small damage to the enemy";
  public actRate = 1.0;

  effect(source: Player, target: Character) {
    target.damage(modDamage(source, 5));
  }
}

skillList.set("attack", new basicAttack());

class healingSkill implements Skill {
  public name = "heal";
  public type = SkillType.TargetAlly;
  public description = "Heals the selected ally for 50 health (Cooldown: 1)";
  public actRate = 0.5;

  effect(source: Player, target: Character) {
    target.heal(modDamage(source, 50));
  }
}

skillList.set("heal", new healingSkill());

class dualStrikes implements Skill {
  public name = "dual strikes";
  public type = SkillType.TargetEnemy;
  public description = "Deals 2 heavy blows to the enemy";
  public actRate = 0.75;

  effect(source: Player, target: Character) {
    target.damage(modDamage(source, 15));
    setTimeout(() => {
      target.damage(modDamage(source, 30));
    }, 200);
  }
}

skillList.set("dual strikes", new dualStrikes());

class rampage implements Skill {
  public name = "rampage";
  public type = SkillType.TargetEnemy;
  public description = "Deals 5 heavy blows to the enemy (Reuse Cooldown: 7)";
  public actRate = 0.15;

  effect(source: Player, target: Character) {
    const dps = modDamage(source, 16);
    target.damage(dps);
    setTimeout(() => {
      target.damage(dps);
    }, 100);
    setTimeout(() => {
      target.damage(dps);
    }, 200);
    setTimeout(() => {
      target.damage(dps);
    }, 300);
    setTimeout(() => {
      target.damage(dps);
    }, 400);
  }
}

skillList.set("rampage", new rampage());

class armorpierce implements Skill {
  public name = "armor pierce";
  public type = SkillType.TargetEnemy;
  public description = "Deals damage and reduces defense";
  public actRate = 0.75;

  effect(source: Player, target: Character) {
    target.damage(modDamage(source, 10));
    target.setDebuff("Defense");
  }
}

skillList.set("armor pierce", new armorpierce());

class weakeningStrike implements Skill {
  public name = "weakening blow";
  public type = SkillType.TargetEnemy;
  public description = "Deals damage and reduces attack";
  public actRate = 0.75;

  effect(source: Player, target: Character) {
    target.damage(modDamage(source, 10));
    target.setDebuff("Attack");
  }
}

skillList.set("weakening blow", new weakeningStrike());

class empower implements Skill {
  public name = "empower";
  public type = SkillType.TargetAlly;
  public description = "Increases selected ally's damage for a while";
  public actRate = 0.75;

  effect(source: Player, target: Character) {
    if (source.canAct()) {
      target.setBuff("Attack");
    }
  }
}

skillList.set("empower", new empower());

class drainingStrike implements Skill {
  public name = "draining blow";
  public type = SkillType.TargetEnemy;
  public description =
    "Deals damage and heals the user simultaneously (Reuse Cooldown: 3)";
  public actRate = 0.75;

  effect(source: Player, target: Character) {
    target.damage(modDamage(source, 20));
    source.heal(modDamage(source, 20));
  }
}

skillList.set("draining blow", new drainingStrike());

class rest implements Skill {
  public name = "rest";
  public type = SkillType.TargetEnemy;
  public description = "Heals yourself for a little amount (Reuse Cooldown: 1)";
  public actRate = 0.75;

  effect(source: Player, target: Character) {
    source.heal(20);
    target.damage(0);
  }
}

skillList.set("rest", new rest());

class soulLink implements Skill {
  public name = "soul link";
  public type = SkillType.TargetEnemy;
  public description = "";
  public actRate = 0.75;

  effect(source: Player, target: Character) {
    source.heal(20);
    target.damage(0);
  }
}

skillList.set("soul link", new soulLink());

class battleRoar implements Skill {
  public name = "battle roar";
  public type = SkillType.TargetEnemy;
  public description = "";
  public actRate = 0.75;

  effect(source: Player, target: Character) {
    source.heal(20);
    target.damage(0);
  }
}

skillList.set("battle roar", new battleRoar());

class powerBoost implements Skill {
  public name = "power boost";
  public type = SkillType.TargetEnemy;
  public description = "";
  public actRate = 0.75;

  effect(source: Player, target: Character) {
    source.heal(20);
    target.damage(0);
  }
}

skillList.set("power boost", new powerBoost());

class chargedStrikes implements Skill {
  public name = "charged strikes";
  public type = SkillType.TargetEnemy;
  public description = "";
  public actRate = 0.75;

  effect(source: Player, target: Character) {
    source.heal(20);
    target.damage(0);
  }
}

skillList.set("charged strikes", new chargedStrikes());