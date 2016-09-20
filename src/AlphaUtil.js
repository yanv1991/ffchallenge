export class AlphaUtil {
  /**
   * This is a ​ pangram 
   */
  static listMissingLetter(text) {
  	const alphabet = "abcdefghijklmnopqrstuvwxyz";
    var result = [...alphabet].filter(function(letter) {
      if(!text.toLowerCase().includes(letter)){
        return letter
      }
    });
    return result.join("");
  }

  static setCharAt(str,index,chr) {
  	if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
  }

  static validateParams(bombs, force) {
  	const invalidBombsMsg = "Invalid bombs value";
  	const invalidForceMsg = "Invalid force value";
  	if( bombs.length < 1 || bombs.length > 50 )
  		throw invalidBombsMsg;
  	if( !(/(B|\.)/g).test(bombs) )
  		throw invalidBombsMsg;
  	if( force < 1 || force > 10 )
  		throw invalidForceMsg;
  }

  static replacePlaceHolders(bombs){
	return bombs.replace(/B/g, '.').replace(/(\*|\+|&)/g, '>').replace(/-/g, '<');
  }

  /**
   * NetHack­esque animation
   */
  static explode(bombs, force) {
  	const bracketsPattern = new RegExp("(>|<)", 'g');
  	let result = [];
  	this.validateParams(bombs, force);
  	result.push(bombs);
  	let tempBomb = bombs;

  	do {
  		for(var i = 0; bombs.length > i; i++){
			if (!bombs.includes("B")) {
				// second step: check for '>,<,X'
				if (bombs.charAt(i) === '>' || bombs.charAt(i) === 'X') {
					if(bombs.charAt(i + force) || i == bombs.length -1){
						if (bombs.charAt(i + force) === 'X') {
							bombs = this.setCharAt(bombs, i + force, '*');
						} else {
							if (bombs.charAt(i + force) === '>') {
								bombs = this.setCharAt(bombs, i + force, '?');
							} else if(bombs.charAt(i + force) === '<'){
								bombs = this.setCharAt(bombs, i, '-');
								bombs = this.setCharAt(bombs, i + force, '+');
							} else if(bombs.charAt(i) === 'X'){
								bombs = this.setCharAt(bombs, i + force, '&');
							} else if(bombs.charAt(i) === '>' &&  bombs.charAt(i) !== bombs.charAt(i - force)){
								bombs = this.setCharAt(bombs, i + force, '+');
							} 
							if (bombs.charAt(i - force) !== '*' && bombs.charAt(i) !== '-' && bombs.charAt(i) !== 'X') {
								bombs = this.setCharAt(bombs, i, '.');
							}
						}
					}
				}

				if(bombs.charAt(i) === '<' || bombs.charAt(i) === 'X') {
					if((i - force) >=  0){
						bombs = this.setCharAt(bombs, i - force, '<');
					}
					bombs = this.setCharAt(bombs, i, '.');
				}

				if (bombs.charAt(i) === '*') {
					bombs = this.setCharAt(bombs, i - force, '<');
					bombs = this.setCharAt(bombs, i + force, '>');
				}

				if (bombs.charAt(i) === '?') {
					bombs = this.setCharAt(bombs, i, '+');
					bombs = this.setCharAt(bombs, i + force, '+');
				}
			} else {
				// first step: replace 'B'
				if (tempBomb.charAt(i) !== '.') {
					if(bombs.charAt(i - force)) {
						if(bombs.charAt(i - force) === '<' || bombs.charAt(i - force) === '>'){
							bombs  = this.setCharAt(bombs, i - force, 'X');
						} else {
							bombs  = this.setCharAt(bombs, i - force, '<');
						}
					}

					if(bombs.charAt(i + force)) {
						if(bombs.charAt(i + force) === '>' || bombs.charAt(i + force) === '<'){
							bombs  = this.setCharAt(bombs, i + force, 'X');
						} else {
							bombs  = this.setCharAt(bombs, i + force, '>');
						}
					}
				}
			}
		}
		bombs = this.replacePlaceHolders(bombs);
	  	result.push(bombs);
	  	if(bombs.match(bracketsPattern) && bombs.match(bracketsPattern).length <= 1) {
	  		if(!bombs.match(/(\.<|>\.)/g)) {
	  			bombs = bombs.replace(bracketsPattern, '.');
	  			result.push(bombs);
	  		}
	  	}
  	} while (bombs.includes('<') || bombs.includes('>'))
  	return result
  }
}