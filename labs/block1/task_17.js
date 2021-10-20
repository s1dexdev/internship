'use strict';

function deleteRowWithValue(array, value) {
    value = value || 0;
    let result = array;
    let indexes = [];

    // Нахождение индекса строк где есть 0
    for (let i = 0; i < array.length; i++) {
        if (array[i].includes(value)) {
            const index = i;

            if (!indexes.includes(index)) {
                indexes.push(index);
            }
        }
    }

    indexes.reverse(); // Для удаления строки с конца

    for (let j = 0; j < indexes.length; j++) {
        result.splice(indexes[j], 1);
    }

    return result;
}

function deleteColumnWithValue(array, value) {
    value = value || 0;
    const result = array;
    let indexes = [];

    // Нахождение индекса столбцов где есть value
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            if (array[j][i] === value) {
                const index = i;

                if (!indexes.includes(index)) {
                    indexes.push(index);
                }
            }
        }
    }

    indexes.reverse(); // Для удаления cтолбцов с конца

    for (let i = 0; i < indexes.length; i++) {
        for (let j = 0; j < array.length; j++) {
            result[j].splice(indexes[i], 1);
        }
    }

    return result;
}
