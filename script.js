/**
 * I've created a working Sugarland challenge game. 🍭.
 * To play, simply click on the dice to start. I designed the game board in Illustrator and sourced the candy pixel art from itch.io. 
 * The game is coded using Vue.js."
 */

new Vue({
    el: '#app',
    data: {
        msg: 'DEMO playing. click dice 2 start',
        goMsg: '',
        rolledNum: 5,
        isRolling: false,
        isGameOver: false,
        isDemo: true,
        currPlayer: 1,
        p1pos: 0,
        p2pos: 0,
        demoInterval: null
    },

    methods: {
        rollDice(evt) {
            if (evt && this.isDemo) {
                this.msg = 'cleaning board...';
                this.clearAll();
                clearInterval(this.demoInterval);
                this.demoInterval = null;
                this.isDemo = false;
                setTimeout(() => {
                    this.start();
                }, 1000);
            }
            if (this.isRolling) return;
            this.isRolling = true;
            let diceInteval = setInterval(() => {
                this.rolledNum = Math.floor(Math.random() * 6) + 1;
            }, 100);
            setTimeout(() => {
                clearInterval(diceInteval);
                this.rolledNum = Math.floor(Math.random() * 6) + 1;
                this.goto(this.rolledNum);
                setTimeout(() => {
                    this.isRolling = false;
                    this.switchPlayer();
                }, 1000);
            }, 800);
        },
        switchPlayer() {
            this.currPlayer = this.currPlayer === 1 ? 2 : 1;
            if (!this.isDemo) {
                this.msg = this.currPlayer === 2 ? 'Go player 2' : 'P1 your turn';
            }
        },
        endGame(winner) {
            this.isGameOver = true;
            this.goMsg = winner;
            if (this.isDemo) {
                this.msg = 'cleaning board...';
                this.clearAll();
                clearInterval(this.demoInterval);
                this.demoInterval = null;
                this.isDemo = false;
                setTimeout(() => {
                    this.start();
                }, 4000);
            }
        },
        goto(howMany) {
            if (this.currPlayer === 1) {
                this.p1pos += howMany;
                if (this.p1pos >= 43) {
                    this.p1pos = 43;
                    this.endGame('p1');
                }
                if (this.p1pos === 23) this.p1pos = 33;
                const pixelpos = this.$refs.map.querySelector(`#m${this.p1pos}`);
                const newX = pixelpos.x.baseVal.value - document.querySelector('#player1 > rect:first-child').x.baseVal.value;
                const newY = pixelpos.y.baseVal.value - document.querySelector('#player1 > rect:first-child').y.baseVal.value;
                this.$refs.p1.style.transform = `translate(${newX + 10}px,${newY + 24}px)`;
            } else {
                this.p2pos += howMany;
                if (this.p2pos >= 43) {
                    this.p2pos = 43;
                    this.endGame('p2');
                }
                if (this.p2pos === 23) this.p2pos = 33;
                const pixelpos = this.$refs.map.querySelector(`#m${this.p2pos}`);
                const newX = pixelpos.x.baseVal.value - document.querySelector('#player2 > rect:first-child').x.baseVal.value;
                const newY = pixelpos.y.baseVal.value - document.querySelector('#player2 > rect:first-child').y.baseVal.value;
                this.$refs.p2.style.transform = `translate(${newX + 40}px,${newY + 40}px)`;
            }
        },
        start() {
            this.msg = 'click dice to start';
            this.goMsg = '';
            this.rolledNum = 5;
            this.isRolling = false;
            this.isGameOver = false;
            this.currPlayer = 2;
            this.currPlayer = 1;
            this.p1pos = 0;
            this.p2pos = 0;
            const newX = 51.63 - document.querySelector('#player1 > rect:first-child').x.baseVal.value;
            const newY = 387.66 - document.querySelector('#player1 > rect:first-child').y.baseVal.value;
            const newX2 = 78.65 - document.querySelector('#player2 > rect:first-child').x.baseVal.value;
            const newY2 = 402.65 - document.querySelector('#player2 > rect:first-child').y.baseVal.value;
            this.$refs.p1.style.transform = `translate(${newX}px,${newY}px)`;
            this.$refs.p2.style.transform = `translate(${newX2}px,${newY2}px)`;
        },
        demo() {
            this.demoInterval = setInterval(() => {
                this.rollDice();
            }, 2000);

        },
        clearAll() {
            const interval_id = window.setInterval("", 9999);
            for (var i = 1; i < interval_id; i++) {
                window.clearInterval(i);
            }
        },
        gotoQua() {
            window.open('www.albasri.dk');
        }
    },

    mounted() {
        this.demo();
    }
});