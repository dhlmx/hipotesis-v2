import * as tf from '@tensorflow/tfjs';

const DOUBLE_PI = tf.scalar(2.0 * Math.PI);

export const XS = tf.mul(DOUBLE_PI, tf.range(-0.5, 0.5, 0.01)),
  NOISE = tf.randomNormal([XS.size]).mul(0.05),
  YS = tf.sin(XS),
  ZS = tf.sin(XS).add(NOISE);
