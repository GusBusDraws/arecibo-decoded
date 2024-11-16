import numpy as np
import imageio.v3 as iio

# Load image as numpy array
img = iio.imread('message.png')
print(img.shape)

# Flatten image into one-dimensional list
flat = list(img.flatten())
print(len(flat))

# Convert integers to strings and joining with an empty string
binary = ''.join([str(dig) for dig in flat])
binary = binary.replace('255', '1')
print(binary)
with open('message.txt', 'w') as f:
    f.write(binary)
