import React, { useContext } from 'react';
import ParticlesBg from 'particles-bg';
import EasterEggContext from '../context';

export default function EasterEgg() {
  const context = useContext(EasterEggContext);
  return context.easterEgg ? <ParticlesBg type="random" bg={true} /> : null;
}
