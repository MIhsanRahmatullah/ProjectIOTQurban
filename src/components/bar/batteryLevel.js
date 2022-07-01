import { Progress } from 'antd';
import React from 'react';

const EnergyBar = (props) => (
  <>
    <Progress
      type="dashboard"
      strokeColor={{
        '0%': '#ff0000',
        '40%': '#ffff00',
        '100%': '#00ff00',
      }}
      percent={90}
      width={100}
      strokeWidth={10}
    />
  </>
);

export default EnergyBar;