import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import Header from '../../components/core/Header';
import TabSelector from '../../components/core/TabSelector';
import DumpsterFire from '../../components/dumpsterFire/DumpsterFire';
import { ThemeContext } from '../../provider/ThemeProvider';

const items = [
  {
    id: 1,
    label: 'Local chat',
    description: "Join your community's open chat.",
    icon: <FontAwesome5 name='dumpster-fire' size={18} color='white' />,
    content: <DumpsterFire />,
  },
  {
    id: 2,
    label: 'Local events',
    description: 'Events near you',
    icon: <FontAwesome5 name='calendar-day' size={18} color='white' />,
  },
];

const Community = () => {
  const { theme } = React.useContext(ThemeContext);

  const [selected, setSelected] = React.useState(items[0].id);

  return (
    <View
      style={{
        paddingTop: 64,
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.background,
      }}
    >
      <Header>
        <Header.Title>{items[selected - 1].label}</Header.Title>
        <Header.Description>
          {items[selected - 1].description}
        </Header.Description>
      </Header>
      <View style={{ marginTop: 8 }}>
        <TabSelector
          items={items}
          selected={selected}
          setSelected={setSelected}
        />
      </View>
      <View style={{ flex: 1 }}>
        <>{items[selected - 1].content}</>
      </View>
    </View>
  );
};

export default Community;
