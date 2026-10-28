export function createParticle(x, y, fixed = false) {
  return {
    position: { x, y },
    previous: { x, y },
    velocity: { x: 0, y: 0 },
    force: { x: 0, y: 0 },
    fixed,
    pinned: fixed,
    angle: 0,
  };
}

export function createLink(a, b, compress = 0.02, stretch = 1.1) {
  const dx = b.position.x - a.position.x;
  const dy = b.position.y - a.position.y;
  const length = Math.hypot(dx, dy);
  return {
    a,
    b,
    minLength: length * compress,
    maxLength: length * stretch,
    direction: length ? { x: dx / length, y: dy / length } : { x: 1, y: 0 },
  };
}

export function moveParticle(particle, position) {
  Object.assign(particle.position, position);
  Object.assign(particle.previous, position);
  particle.velocity.x = particle.velocity.y = 0;
  particle.force.x = particle.force.y = 0;
}

export function releaseParticle(particle) {
  particle.pinned = particle.fixed;
  moveParticle(particle, particle.position);
}

export function pushParticles(particles, pointer, scale = 1) {
  for (const particle of particles) {
    if (particle.pinned) continue;
    const dx = particle.position.x - pointer.x;
    const dy = particle.position.y - pointer.y;
    const squared = dx * dx + dy * dy;
    if (squared >= 5000) continue;
    const distance = Math.sqrt(squared);
    const t = (5000 - squared) / 7000;
    const strength = t * t * (3 - 2 * t) * 3.7 * scale;
    particle.force.x = Math.max(-4, Math.min(4, particle.force.x + (distance ? dx / distance : 1) * strength));
    particle.force.y = Math.max(-4, Math.min(4, particle.force.y + (distance ? dy / distance : 0) * strength));
  }
}

export function stepParticles(particles, links, reducedMotion = false) {
  const damping = reducedMotion ? 0.82 : 0.99;
  for (const particle of particles) {
    if (!particle.pinned) {
      const vx = (particle.position.x - particle.previous.x) * damping;
      const vy = (particle.position.y - particle.previous.y) * damping;
      const limit = Math.min(1, 25 / (Math.hypot(vx, vy) || 1));
      Object.assign(particle.previous, particle.position);
      particle.position.x += vx * limit + particle.force.x;
      particle.position.y += vy * limit + particle.force.y + 0.2;
    }
    particle.force.x = particle.force.y = 0;
  }
  for (let iteration = 0; iteration < 5; iteration++) {
    for (const { a, b, minLength, maxLength, direction } of links) {
      const weight = Number(!a.pinned) + Number(!b.pinned);
      if (!weight) continue;
      const dx = b.position.x - a.position.x;
      const dy = b.position.y - a.position.y;
      const distance = Math.hypot(dx, dy);
      if (distance >= minLength && distance <= maxLength) continue;
      const target = Math.max(minLength, Math.min(maxLength, distance));
      const offset = (distance - target) / weight;
      const x = (distance > 1e-8 ? dx / distance : direction.x) * offset;
      const y = (distance > 1e-8 ? dy / distance : direction.y) * offset;
      if (!a.pinned) {
        a.position.x += x;
        a.position.y += y;
      }
      if (!b.pinned) {
        b.position.x -= x;
        b.position.y -= y;
      }
    }
  }
  let energy = 0;
  let count = 0;
  for (const particle of particles) {
    particle.velocity.x = particle.pinned ? 0 : particle.position.x - particle.previous.x;
    particle.velocity.y = particle.pinned ? 0 : particle.position.y - particle.previous.y;
    if (!particle.fixed) {
      energy += particle.velocity.x ** 2 + particle.velocity.y ** 2;
      count++;
    }
  }
  return Math.sqrt(energy / Math.max(1, count));
}
