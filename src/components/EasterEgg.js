import React, { useContext } from 'react';
import ParticlesBg from 'particles-bg';
import EasterEggContext from '../context';

export default function EasterEgg() {
  const context = useContext(EasterEggContext);
  return context.easterEgg ? (
    <ParticlesBg
      type="random"
      bg={{
        position: 'fixed',
        zIndex: -1,
        top: 0,
        left: 0,
      }}
    />
  ) : null;
}
