import * as tf from '@tensorflow/tfjs';

export const N = 100,
  CLUSTER_A = tf.randomNormal([N, 2]).add([2.0, 1.0]),
  CLUSTER_B = tf.randomNormal([N, 2]).add([-2.0, -1.0]),
  LABELS_A = tf.ones([N, 1]),
  LABELS_B = tf.zeros([N, 1]),
  XS = CLUSTER_A.concat(CLUSTER_B),
  YS = LABELS_A.concat(LABELS_B),
  INPUT = XS.concat(tf.ones([2 * N, 1]), 1);
