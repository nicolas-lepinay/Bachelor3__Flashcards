<template>
    <div class="card">
		<div class="card__inner" @click="toggleClass">
			<div class="card__face card__face--front">
				<h2>{{ card.question }}</h2>
			</div>
			<div class="card__face card__face--back">
				<div class="card__content">
					<div class="card__body">
						<h3>{{ card.answer }}</h3>
                        <div class="right-wrong-buttons d-flex jcsb">
                            <button @click="validate(false)">❌</button>
                            <button @click="validate(true)">✔️</button>
                        </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
    name: 'Card',
    props: ["card"],
    methods: {
        toggleClass: function(e) {
            let target = e.target;
            while(!target.classList.contains("card__inner")) {
                target = target.parentNode;
            }
            target.classList.toggle('is-flipped');
        },
        validate: function(isCorrect) {
            this.$emit('next');
            if(isCorrect) {
                // SET LEVEL UP
                console.log(this.card.answer);
            } else {
                // SET LEVEL TO 0
            };
        }
    },
}
</script>

<style lang="scss" scoped>

.card {
  width: 100%;
  height: 500px;
  perspective: 1000px;
  margin-top: 26px;
}

.card__inner {
  width: 100%;
  height: 100%;
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card__inner.is-flipped {
  transform: rotateY(180deg);
}


.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 26px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

.card__face--front {
  //background-image: linear-gradient(to bottom right, red, orange);
  background-color: rgb(50, 50, 50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 26px;
}

.card__face--front h2 {
  color: #FFF;
  font-size: 26px;
  text-align: center;
}

.card__face--back {
  background-color: white;
  transform: rotateY(180deg);
}

.card__content {
  width: 100%;
  height: 100%;
}

.card__header {
  position: relative;
  padding: 30px 30px 40px;
}

.card__header:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(to bottom left, red 10%, orange 115%);
  z-index: -1;
  border-radius: 0px 0px 50% 0px;
}

.pp {
  display: block;
  width: 128px;
  height: 128px;
  margin: 0 auto 30px;
  border-radius: 50%;
  background-color: #FFF;
  border: 5px solid #FFF;
  object-fit: cover;
}

.card__header h2 {
  color: #FFF;
  font-size: 32px;
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
}

.card__body {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 26px;
  text-align: center;
  height: 100%;
  position: relative;
}

.card__body h3 {
  color: black;
  font-size: 42px;
}

.card__body p {
  color: black;
  font-size: 18px;
  line-height: 1.4;
}

.right-wrong-buttons {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 32px;
    & button {
        cursor: pointer;
        font-size: 28px;
        background-color: transparent;
        border: none;
        outline: none;
        padding: 10px;
        &:hover {
            background-color: rgba(0, 0, 0, 0.03);
            border-radius: 15px;
        }
    }
}

</style>