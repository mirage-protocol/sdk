enum Result {
  SMALLER,
  GREATER,
  EQUAL,
}

function compareByteVector(left: number[], right: number[]): Result {
  const left_length = left.length
  const right_length = right.length

  let idx = 0

  while (idx < left_length && idx < right_length) {
    const left_byte = left[idx]
    const right_byte = right[idx]

    if (left_byte < right_byte) {
      return Result.SMALLER
    } else if (left_byte > right_byte) {
      return Result.GREATER
    }
    idx++
  }

  if (left_length < right_length) {
    return Result.SMALLER
  } else if (left_length > right_length) {
    return Result.GREATER
  } else {
    return Result.EQUAL
  }
}

function convertToBytes(str: string): number[] {
  return [...str].map((char) => char.charCodeAt(0))
}

export function isSorted(stringOne: string, stringTwo: string): boolean {
  const comparisonResult = compareByteVector(convertToBytes(stringOne), convertToBytes(stringTwo))

  if (comparisonResult === Result.EQUAL) {
    throw new Error('Trying to sort the same type')
  } else {
    return comparisonResult === Result.SMALLER
  }
}
