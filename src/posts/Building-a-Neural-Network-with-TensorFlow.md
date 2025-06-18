---
title: "Building a Neural Network with TensorFlow"
date: "2025-06-18"
category: ["Technology"]
cover: "/images/blog/blog-image-12.jpg"
thumbnail: "/images/blog/sm/blog-image-12.jpg"
---

TensorFlow (with Keras) simplifies building and training neural networks. In TensorFlow 2, you often use the `tf.keras.Sequential` API to stack layers. For example, to classify 28×28 images, the tutorial shows:

```python
model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10)
])
```

Then compile and train the model:

```python
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
model.fit(x_train, y_train, epochs=5)
```

This example builds a simple feedforward network: it flattens input pixels, has a hidden layer of 128 ReLU neurons, a dropout layer, and an output layer of 10 logits (for digits 0–9). The model is trained with the Adam optimizer to minimize a classification loss.

##### Training Pipeline

1. **Compile:** Set optimizer and loss function (e.g. `optimizer='adam'`, `loss='sparse_categorical_crossentropy'`).
2. **Fit:** Train on data (`model.fit(x_train, y_train, epochs=5)`).
3. **Evaluate:** Check performance (e.g. `model.evaluate(x_test, y_test)`).

TensorFlow’s high-level APIs (Keras) handle backpropagation automatically. Use `model.predict` to get predictions or attach a Softmax layer for probabilities. Check the [official TensorFlow Quickstart tutorial](https://www.tensorflow.org/tutorials/quickstart/beginner) for a step-by-step walkthrough. The example network above achieves \~98% accuracy on MNIST by epoch 5.

**References:** TensorFlow’s guides and the Quickstart offer detailed examples. The code snippets above mirror their recommendations, e.g., compiling and fitting models.
