package com.backspace.technologies.crud.utils;

import java.time.LocalDate;
import java.util.Random;

public class OrderNumberGenerator {

    private OrderNumberGenerator() {}

    public static String generateOrderReference() {
        String datePart = LocalDate.now().toString().replace("-", "");
        int randomPart = new Random().nextInt(90000) + 1000;
        return datePart + "-" + randomPart;
    }
}
