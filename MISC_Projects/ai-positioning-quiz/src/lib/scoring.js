function getBucket(score) {
  if (score <= -5) return 0;
  if (score >= 5) return 2;
  return 1;
}

function getPosition(xScore, yScore) {
  const xBucket = getBucket(xScore);
  const yBucket = getBucket(yScore);
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  return matrix[yBucket][xBucket];
}

export function computeScores(answers) {
  let xScore = 0;
  let yScore = 0;
  for (const { axis, score } of answers) {
    if (axis === 'x') xScore += score;
    else yScore += score;
  }
  return { xScore, yScore };
}

export function computeResult(answers) {
  const { xScore, yScore } = computeScores(answers);
  return {
    positionId: getPosition(xScore, yScore),
    xScore,
    yScore,
  };
}
