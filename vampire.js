class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  };

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  };

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  };

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    if (this.creator === null) {
      return true;
    } else if (this === vampire.creator) {
      return true;
    } else if (this.yearConverted < vampire.yearConverted) {
      return true;
    }

    return false;
  };

  /** Tree traversal methods **/

  // Returns the vampire object with that name, or null if no vampire exists with that name
  // currentVampire?.name === name
  
  vampireWithName(name) {

    if (this.name === name) {
      return this;
    }

    for (const offspring of this.offspring) {
      const currentVampire = offspring.vampireWithName(name); // 2
      if (currentVampire && currentVampire.name === name) {
        return currentVampire;
      }

    }

    return null;

  }

  // Returns the total number of vampires that exist
  get totalDescendents() {

    let totalDescendents = 0; 

    for (const offspring of this.offspring) {
      let totalOffspring = offspring.totalDescendents;
      totalOffspring++;
      totalDescendents += totalOffspring;
    }

    return totalDescendents;
    
  }

  // Returns an array of all the vampires that were converted after 1980
  get allMillennialVampires() {

    let millenialVampires = [];

    if (this.yearConverted > 1980) {
      millenialVampires.push(this);
    }

    for (const offspring of this.offspring) {
      const millenialOffspring = offspring.allMillennialVampires;
      millenialVampires = millenialVampires.concat(millenialOffspring);
    }

    return millenialVampires;
  };

  closestCommonAncestor(vampire) {
    let currentVampire = this;

    if (vampire.creator === null) {
      return vampire;
    } else if (currentVampire.creator === null) {
      return currentVampire;
    } else if (vampire === currentVampire) {
      return vampire;
    } else if (vampire.creator === currentVampire.creator) {
      return currentVampire.creator;
    } else if (vampire === currentVampire.creator) {
      return vampire;
    } else if (vampire.creator === currentVampire) {
      return currentVampire;
    }

    let vampireAncestors = [];
    let thisAncestors = [];

    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      thisAncestors.push(currentVampire);
    }
    currentVampire = vampire;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      vampireAncestors.push(currentVampire);
    }

    for (let tAncestor of thisAncestors) {
      for (let vAncestor of vampireAncestors) {
        if (tAncestor === vAncestor) {
          return tAncestor
        }
      }
    }
  }

}

module.exports = Vampire;