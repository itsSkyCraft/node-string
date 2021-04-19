class nodeString{
    /**
     * 
     * @param {string} [Detects] - The Word to Detect on the String
     * @param {string} [string] - the String 
     * @param {string} [secondword] - The Second Word to Count on the String
     * @param {string} [replaceword] - The word on a string where you want to replace with.
     * @param {string} [toreplace] - The Word to Replace on the String
     * @param {Number} [num] - A Valid Number
     */
    constructor(string){
        if(!string) throw new TypeError('Please provide a String!');
        this.word = string;
    }

    static async wordCount(){
        const val = this.word;
        var wom = val.match(/\S+/g);
        return {
          charactersNoSpaces: val.replace(/\s+/g, '').length,
          characters: val.length,
          words: wom ? wom.length : 0,
          lines: val.split(/\r*\n/).length,
          capitals: val.length - val.replace(/[A-Z]/g, '').length,
          notcapitals: val.length - val.replace(/[a-z]/g, '').length,
          digits: val.length - val.replace(/[1-9]/g, '').length
        };
    }
    static async DetectWord(Detects){
        if(!Detects) throw new TypeError('Expected Word to Check!');
        if(typeof Detects !== 'string') throw new TypeError('Expected Word to Check!');
        if(this.word.toLowerCase().includes(Detects.toLowerCase())){
            return true;
        }else{
            return false;
        }
    }
    static async scramble(){
        if(this.word.length === 0) throw new TypeError('The Given String must be at least 1 character');
    
        var arr = this.word.split('');      
        arr.sort(function() {
          return 0.5 - Math.random();
        });  
        const newword = arr.join('');                
        return newword;  
    }
    static async scrambletext(){
        var word2 = wordmanager.getWord(this.word);
    
        if(word2.words <= 1) throw new TypeError('The Given string must be at least 2 word');
    
        var shuffled = this.word.split(/\s\b(?!\s)/).sort(function(){return 0.5-Math.random()}).join(' ');
    
        return shuffled;
    }
    static async GetTotalWord(secondword){
        if(!secondword || typeof secondword !== 'string') throw new TypeError('Expected A Second Word!');
        if(!this.word.toLowerCase().includes(secondword.toLowerCase())) return 0;

        const regex = new RegExp(secondword.toLowerCase(), 'g');
        const regex1 = new RegExp(secondword.toUpperCase(), 'g');
        const thelower = (this.word.length - this.word.replace(regex, '').length);
        const theUpper = (this.word.length - this.word.replace(regex1, '').length);

        return thelower + theUpper;

    }
    static async replaceAll(replaceword, toreplace){
        if(!replaceword || typeof replaceword !== 'string') throw new TypeError('Expected A String');
        if(!toreplace || typeof toreplace !== 'string') throw new TypeError('Please Give A Word To Replace on the string')

        const regex = new RegExp(replaceword, 'g');
        const res = this.word.replace(regex, toreplace);

        return res;
    }
    static async isUrl(){ // I Got this from is-url npm package.
        var protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;

        var localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/
        var nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

        const string = this.word

        if (typeof string !== 'string') {
            return false;
          }
        
          const match = string.match(protocolAndDomainRE);
          if (!match) {
            return false;
          }
        
          const everythingAfterProtocol = match[1];
          if (!everythingAfterProtocol) {
            return false;
          }
        
          if (localhostDomainRE.test(everythingAfterProtocol) ||
              nonLocalhostDomainRE.test(everythingAfterProtocol)) {
            return true;
          }
        
          return false;
    }
    static async right(num){
        if(!num) throw new TypeError('Expected A Number!');
        if(isNaN(num)) throw new TypeError('The Given Number is Not a Number!');

        return this.word.slice(this.word.length - num);
    }

}

module.exports = nodeString;