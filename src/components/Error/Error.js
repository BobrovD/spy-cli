import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { routeList } from '../../router'
import { View, Text } from '@vkontakte/vkui'

const Error = (props) => {

  const {
    id
  } = props

  const {
    goTo
  } = props

	return (
    <View id={id}>
      <Panel>
        <PanelHeader onClick={ () => {goTo(routeList.home)} }>Что-то пошло не так</PanelHeader>
        <Text>{ props.message ?? 'Ошибка' }</Text>
      </Panel>
    </View>
	);
};

export default Error;
