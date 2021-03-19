import React from 'react';
import { routeList } from '../../router'
import { View, ContentCard, Panel, Button } from '@vkontakte/vkui'

const Info = (props) => {

  const {
    id
  } = props

  const {
    goTo
  } = props

	return (
    <View id={id}>
      <Panel>
        <ContentCard
          style={{margin: 16}}
          image="https://spy-game.ru/storage/locations/beach.png"
          header="Игра Шпион"
          text="Представьте, что вы находитесь на пляже. И один из вас — шпион. Отправился на задание, но не знает, куда попал.
          Вы не знаете, кто шпион, поэтому с подозрением относитесь ко всем игрокам, пытаясь проверить каждого, чтобы вычислить агента и передать его властям.
          А шпион пытается по вашим вопросам догадаться, в какой из тридцати локаций он находится. Это даже не Мафия, это приключенческое кино с пристрастием!"
          maxHeight={500}
        />
        <Button style={{marginLeft: 16, marginRight: 16, marginBottom: 16}} size="l" onClick={ () => { goTo(routeList.home) } } >Понятно</Button>
      </Panel>
    </View>
	);
};

export default Info;
