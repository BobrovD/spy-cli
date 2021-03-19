import React from 'react';
import Panel from '@vkontakte/vkui/dist/components/Panel/Panel';
import PanelHeader from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader';
import { View } from '@vkontakte/vkui'

const Loader = (props) => {

  const {
    id
  } = props

	return (
    <View id={id}>
      <Panel>
        <PanelHeader>Загрузка</PanelHeader>
      </Panel>
    </View>
	);
};

export default Loader;
