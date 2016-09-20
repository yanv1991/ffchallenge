export class AlphaUtil {
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

  static explode(bombs, force) {
  	const invalidBombsMsg = "Invalid bombs value";
  	const invalidForceMsg = "Invalid force value";
  	var pattern = new RegExp("(B|.)", 'g');
  	var bracketsPattern = new RegExp("(>|<)", 'g');
  	var result = [];
  	var myBRegex = new RegExp('B', "g");
  	if( bombs.length < 1 || bombs.length > 50 )
  		throw invalidBombsMsg;
  	if( !pattern.test(bombs) )
  		throw invalidBombsMsg;
  	if( force < 1 || force > 10 )
  		throw invalidForceMsg;
  	result.push(bombs);
  	var tempBomb = bombs;

  	do {
  		for(var i = 0; bombs.length > i; i++){

			if (!bombs.includes("B")) {
				// second step: check for '>,<,X'
				console.log("entro acaa")
				if (bombs.charAt(i) === '>' || bombs.charAt(i) === 'X' || bombs.charAt(i) === '+') {
					if(bombs.charAt(i + force)){
						if (bombs.charAt(i + force) === 'X') {
							bombs = this.setCharAt(bombs, i + force, '*');
						} else {
							if (bombs.charAt(i + force) === '>') {
								bombs = this.setCharAt(bombs, i + force, '+');
							} else if(bombs.charAt(i + force) === '<'){
								bombs = this.setCharAt(bombs, i - force, '-');
								bombs = this.setCharAt(bombs, i + force, '+');
							} else {
								bombs = this.setCharAt(bombs, i + force, '>');
							}
							if (bombs.charAt(i - force) !== '*' && bombs.charAt(i) !== '+' && bombs.charAt(i) !== 'X') {
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
		
		bombs = bombs.replace(myBRegex, '.');
		bombs = bombs.replace(/(\*|\+)/g, '>');
		bombs = bombs.replace(/-/g, '<');
	  	result.push(bombs);
	  	if(bombs.match(bracketsPattern) && bombs.match(bracketsPattern).length <= 1) {
	  		bombs = bombs.replace(bracketsPattern, '.');
	  		result.push(bombs);
	  	}
  	} while (bombs.includes('<') || bombs.includes('>'))
  	return result
  }
}