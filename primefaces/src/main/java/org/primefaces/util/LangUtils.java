/*
 * The MIT License
 *
 * Copyright (c) 2009-2025 PrimeTek Informatics
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
package org.primefaces.util;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.regex.Pattern;

import jakarta.faces.FacesException;
import jakarta.xml.bind.DatatypeConverter;

public class LangUtils {

    public static final Object[] EMPTY_OBJECT_ARRAY = new Object[0];
    private static final Pattern CAPITAL_CASE = Pattern.compile("(?<=.)(?=\\p{Lu})");
    private static final Pattern DIACRITICS_PATTERN = Pattern.compile("\\p{M}");

    private LangUtils() {
    }

    public static boolean isEmpty(String value) {
        return value == null || value.isEmpty();
    }

    public static boolean isNotEmpty(String value) {
        return !isEmpty(value);
    }

    public static boolean isBlank(String str) {
        if (str == null) {
            return true;
        }

        int strLen = str.length();
        if (strLen == 0) {
            return true;
        }

        for (int i = 0; i < strLen; i++) {
            if (!Character.isWhitespace(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }

    public static boolean isNotBlank(String value) {
        return !isBlank(value);
    }

    /**
     * Returns either the passed in String, or if the String is
     * whitespace, empty ("") or {@code null}, the value of {@code defaultStr}.
     *
     * <p>Whitespace is defined by {@link Character#isWhitespace(char)}.</p>
     *
     * <pre>
     * LangUtils.defaultIfBlank(null, "NULL")  = "NULL"
     * LangUtils.defaultIfBlank("", "NULL")    = "NULL"
     * LangUtils.defaultIfBlank(" ", "NULL")   = "NULL"
     * LangUtils.defaultIfBlank("bat", "NULL") = "bat"
     * LangUtils.defaultIfBlank("", null)      = null
     * </pre>
     * @param str the String to check, may be null
     * @param defaultStr  the default String to return
     *  if the input is whitespace, empty ("") or {@code null}, may be null
     * @return the passed in String, or the default
     */
    public static String defaultIfBlank(final String str, final String defaultStr) {
        return isBlank(str) ? defaultStr : str;
    }

    /**
     * <p>Counts how many times the char appears in the given string.</p>
     *
     * <p>A {@code null} or empty ("") String input returns {@code 0}.</p>
     *
     * <pre>
     * StringUtils.countMatches(null, *)       = 0
     * StringUtils.countMatches("", *)         = 0
     * StringUtils.countMatches("abba", 0)  = 0
     * StringUtils.countMatches("abba", 'a')   = 2
     * StringUtils.countMatches("abba", 'b')  = 2
     * StringUtils.countMatches("abba", 'x') = 0
     * </pre>
     *
     * @param str  the CharSequence to check, may be null
     * @param ch  the char to count
     * @return the number of occurrences, 0 if the CharSequence is {@code null}
     * @since 3.4
     */
    public static int countMatches(final String str, final char ch) {
        if (isEmpty(str)) {
            return 0;
        }
        int count = 0;
        // We could also call str.toCharArray() for faster look ups but that would generate more garbage.
        for (int i = 0; i < str.length(); i++) {
            if (ch == str.charAt(i)) {
                count++;
            }
        }
        return count;
    }

    /**
     * <p>Gets a substring from the specified String avoiding exceptions.</p>
     *
     * <p>A negative start position can be used to start/end {@code n}
     * characters from the end of the String.</p>
     *
     * <p>The returned substring starts with the character in the {@code start}
     * position and ends before the {@code end} position. All position counting is
     * zero-based -- i.e., to start at the beginning of the string use
     * {@code start = 0}. Negative start and end positions can be used to
     * specify offsets relative to the end of the String.</p>
     *
     * <p>If {@code start} is not strictly to the left of {@code end}, ""
     * is returned.</p>
     *
     * <pre>
     * StringUtils.substring(null, *, *)    = null
     * StringUtils.substring("", * ,  *)    = "";
     * StringUtils.substring("abc", 0, 2)   = "ab"
     * StringUtils.substring("abc", 2, 0)   = ""
     * StringUtils.substring("abc", 2, 4)   = "c"
     * StringUtils.substring("abc", 4, 6)   = ""
     * StringUtils.substring("abc", 2, 2)   = ""
     * StringUtils.substring("abc", -2, -1) = "b"
     * StringUtils.substring("abc", -4, 2)  = "ab"
     * </pre>
     *
     * @param str  the String to get the substring from, may be null
     * @param start  the position to start from, negative means
     *  count back from the end of the String by this many characters
     * @param end  the position to end at (exclusive), negative means
     *  count back from the end of the String by this many characters
     * @return substring from start position to end position,
     *  {@code null} if null String input
     */
    public static String substring(final String str, int start, int end) {
        if (str == null) {
            return null;
        }

        // handle negatives
        if (end < 0) {
            end = str.length() + end; // remember end is negative
        }
        if (start < 0) {
            start = str.length() + start; // remember start is negative
        }

        // check length next
        if (end > str.length()) {
            end = str.length();
        }

        // if start is greater than end, return ""
        if (start > end) {
            return Constants.EMPTY_STRING;
        }

        if (start < 0) {
            start = 0;
        }
        if (end < 0) {
            end = 0;
        }

        return str.substring(start, end);
    }

    public static boolean contains(Object[] array, Object object) {
        if (array == null || array.length == 0) {
            return false;
        }

        for (int i = 0; i < array.length; i++) {
            if (array[i].equals(object)) {
                return true;
            }
        }

        return false;
    }



    @SafeVarargs
    public static <T> Set<T> concat(Set<T>...  sets) {
        HashSet<T> result = new HashSet<>();
        for (Set<T> set : sets) {
            result.addAll(set);
        }
        return Collections.unmodifiableSet(result);
    }

    @SafeVarargs
    public static <T> List<T> concat(List<T>...  lists) {
        ArrayList<T> result = new ArrayList<>();
        for (List<T> list : lists) {
            result.addAll(list);
        }
        return Collections.unmodifiableList(result);
    }

    public static String[] concat(String[] array1, String[] array2) {
        int length1 = array1.length;
        int length2 = array2.length;
        int length = length1 + length2;
        String[] dest = new String[length];
        System.arraycopy(array1, 0, dest, 0, length1);
        System.arraycopy(array2, 0, dest, length1, length2);
        return dest;
    }

    public static String[] concat(String[]... arrays) {
        int destSize = 0;
        for (int i = 0; i < arrays.length; i++) {
            destSize += arrays[i].length;
        }

        String[] dest = new String[destSize];

        int lastIndex = 0;
        for (int i = 0; i < arrays.length; i++) {
            String[] array = arrays[i];
            System.arraycopy(array, 0, dest, lastIndex, array.length);
            lastIndex += array.length;
        }

        return dest;
    }

    public static boolean containsIgnoreCase(String[] array, String searchedText) {
        if (array == null || array.length == 0 || searchedText == null) {
            return false;
        }

        String compareValue = searchedText.toLowerCase();
        for (int i = 0; i < array.length; i++) {
            String arrayValue = Objects.toString(array[i]).toLowerCase();
            if (arrayValue.contains(compareValue)) {
                return true;
            }
        }

        return false;
    }

    @SafeVarargs
    public static <T> List<T> unmodifiableList(T... args) {
        return Collections.unmodifiableList(Arrays.asList(args));
    }

    public static <E> Set<E> newLinkedHashSet(E... elements) {
        Set<E> set = new LinkedHashSet<>(elements.length);
        Collections.addAll(set, elements);
        return set;
    }

    public static boolean isClassAvailable(String name) {
        return tryToLoadClassForName(name) != null;
    }

    public static <T> Class<T> tryToLoadClassForName(String name) {
        try {
            return loadClassForName(name);
        }
        catch (ClassNotFoundException e) {
            return null;
        }
    }

    public static Method tryToLoadMethodForName(Class<?> clazz, String name, Class<?>... args) {
        try {
            return clazz.getDeclaredMethod(name, args);
        }
        catch (NoSuchMethodException e) {
            return null;
        }
    }

    public static <T> Class<T> loadClassForName(String name) throws ClassNotFoundException {
        try {
            return (Class<T>) Class.forName(name, false, LangUtils.class.getClassLoader());
        }
        catch (ClassNotFoundException e) {
            return (Class<T>) Class.forName(name, false, getContextClassLoader());
        }
    }

    public static ClassLoader getContextClassLoader() {
        return Thread.currentThread().getContextClassLoader();
    }

    public static ClassLoader getCurrentClassLoader(Class clazz) {
        ClassLoader cl = getContextClassLoader();

        if (cl == null && clazz != null) {
            cl = clazz.getClassLoader();
        }

        return cl;
    }

    /**
     * NOTE: copied from DeltaSpike
     *
     * @param currentClass current class
     *
     * @return class of the real implementation
     */
    public static Class getUnproxiedClass(Class currentClass) {
        Class unproxiedClass = currentClass;

        while (isProxiedClass(unproxiedClass)) {
            unproxiedClass = unproxiedClass.getSuperclass();
        }

        return unproxiedClass;
    }

    /**
     * NOTE: copied from DeltaSpike
     *
     * Analyses if the given class is a generated proxy class
     *
     * @param currentClass current class
     *
     * @return true if the given class is a known proxy class, false otherwise
     */
    public static boolean isProxiedClass(Class<?> currentClass) {
        if (currentClass == null || currentClass.getSuperclass() == null) {
            return false;
        }

        String name = currentClass.getName();
        return name.startsWith(currentClass.getSuperclass().getName())
                    && (name.contains("$$") // CDI
                    || name.contains("_ClientProxy") //Quarkus
                    || name.contains("$HibernateProxy$")); // Hibernate
    }

    /**
     * Determines the type of the generic collection via the getter.
     *
     * ATTENTION: This method is not designed to cover all possible (edge-)cases. For all full implementation look into something like
     * <a href="https://github.com/spring-projects/spring-framework/blob/master/spring-core/src/main/java/org/springframework/core/GenericTypeResolver.java.">
     * https://github.com/spring-projects/spring-framework/blob/master/spring-core/src/main/java/org/springframework/core/GenericTypeResolver.java</a>
     *
     * @param base Object which contains the collection-property as getter.
     * @param property Name of the collection-property.
     * @return Type of the objects within the collection-property. (eg List&lt;String&gt; -&gt; String)
     */
    public static Class<?> getTypeFromCollectionProperty(Object base, String property) {
        try {
            Map<Type, Type> genericTypeArgs2ActualTypeArgs = new HashMap<>();

            Class<?> baseClass = getUnproxiedClass(base.getClass());
            Class<?> superClass = baseClass.getSuperclass();
            Type genericSuperclass = baseClass.getGenericSuperclass();

            /*
            Attention: The code for resolving generic superclasses may have some limitations. Or it may assume some
            simplifications that are note applicable.
            For all full implementation look into something like
            https://github.com/spring-projects/spring-framework/blob/master/spring-core/src/main/java/org/springframework/core/GenericTypeResolver.java
             */
            while (superClass != null && genericSuperclass != null) {
                if (genericSuperclass instanceof ParameterizedType) {
                    ParameterizedType parameterizedType = (ParameterizedType) genericSuperclass;
                    List<Type> actualTypeArgs = Arrays.asList(parameterizedType.getActualTypeArguments());
                    List<Type> genericTypeArgs;

                    if (parameterizedType.getRawType() instanceof Class) {
                        Class<?> rawSuperClass = (Class<?>) parameterizedType.getRawType();
                        genericTypeArgs = Arrays.asList(rawSuperClass.getTypeParameters());

                        for (int i = 0; i < genericTypeArgs.size(); i++) {
                            genericTypeArgs2ActualTypeArgs.put(genericTypeArgs.get(i), actualTypeArgs.get(i));
                        }
                    }
                }

                genericSuperclass = superClass.getGenericSuperclass();
                superClass = superClass.getSuperclass();
            }

            //  After resolving eventual generic superclasses look for the getter.
            BeanInfo beanInfo = Introspector.getBeanInfo(baseClass);
            for (PropertyDescriptor pd : beanInfo.getPropertyDescriptors()) {
                if (pd.getName().equals(property)) {
                    Method getter = pd.getReadMethod();

                    if (getter.getGenericReturnType() instanceof ParameterizedType) {
                        ParameterizedType pt = (ParameterizedType) getter.getGenericReturnType();

                        Type listType = pt.getActualTypeArguments()[0];
                        if (listType  instanceof TypeVariable) {
                            TypeVariable<?> typeVar = (TypeVariable<?>) listType;
                            Type typeVarResolved = genericTypeArgs2ActualTypeArgs.get(typeVar);
                            return loadClassForName(typeVarResolved.getTypeName());
                        }
                        else {
                            return loadClassForName(listType.getTypeName());
                        }
                    }
                    break;
                }
            }
        }
        catch (ClassNotFoundException | IntrospectionException e) {
            throw new FacesException(e);
        }

        return null;
    }

    public static String md5Hex(byte[] bytes) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(bytes);
            return DatatypeConverter.printHexBinary(md.digest());
        }
        catch (NoSuchAlgorithmException e) {
            throw new FacesException(e);
        }
    }

    /**
     * Converts a sting to capital case even counting Unicode characters.
     * <pre>
     * thisIsMyString = This Is My String
     * ThisIsATest = This Is A Test
     * helloWorld = Hello World
     * </pre>
     *
     * @param value the value to capital case
     * @return the returned value in capital case or empty string if blank
     */
    public static String toCapitalCase(String value) {
        if (LangUtils.isBlank(value)) {
            return Constants.EMPTY_STRING;
        }

        // split on unicode uppercase characters
        String[] values = CAPITAL_CASE.split(value);
        if (values.length > 0) {
            values[0] = values[0].substring(0 , 1).toUpperCase() + values[0].substring(1).toLowerCase();
        }
        return String.join(" ", values);
    }

    /**
     * Capitalizes the first character of the given string.
     *
     * @param name The string to capitalize.
     * @return The capitalized string if the input is not blank; otherwise, returns the input string unchanged.
     */
    public static String capitalize(String name) {
        if (isBlank(name)) {
            return name;
        }
        return name.substring(0, 1).toUpperCase(Locale.ENGLISH) + name.substring(1);
    }


    /**
     * <p>Checks whether the given String is a parsable number.</p>
     *
     * <p>Parsable numbers include those Strings understood by {@link Integer#parseInt(String)},
     * {@link Long#parseLong(String)}, {@link Float#parseFloat(String)} or
     * {@link Double#parseDouble(String)}. This method can be used instead of catching {@link java.text.ParseException}
     * when calling one of those methods.</p>
     *
     * <p>Hexadecimal and scientific notations are <strong>not</strong> considered parsable.
     *
     * <p>{@code Null} and empty String will return {@code false}.</p>
     *
     * @param str the String to check.
     * @return {@code true} if the string is a parsable number.
     * @since 3.4
     */
    public static boolean isNumeric(final String str) {
        if (isEmpty(str)) {
            return false;
        }
        if (str.charAt(str.length() - 1) == '.') {
            return false;
        }
        if (str.charAt(0) == '-') {
            if (str.length() == 1) {
                return false;
            }
            return withDecimalsParsing(str, 1);
        }
        return withDecimalsParsing(str, 0);
    }

    /**
     * Normalizes the given value by removing diacritics.
     *
     * @param value the value to normalize, expected to be a String.
     * @param shouldNormalize whether to remove diacritics from the string.
     * @return the normalized string, or an empty string if the input is not a string or is empty.
     */
    public static Object normalize(Object value, boolean shouldNormalize) {
        if (!shouldNormalize || !(value instanceof String)) {
            return value;
        }

        String strValue = (String) value;
        if (strValue.isEmpty()) {
            return Constants.EMPTY_STRING;
        }

        return DIACRITICS_PATTERN.matcher(java.text.Normalizer.normalize(strValue, java.text.Normalizer.Form.NFD)).replaceAll(Constants.EMPTY_STRING);
    }

    private static boolean withDecimalsParsing(final String str, final int beginIdx) {
        int decimalPoints = 0;
        for (int i = beginIdx; i < str.length(); i++) {
            final boolean isDecimalPoint = str.charAt(i) == '.';
            if (isDecimalPoint) {
                decimalPoints++;
            }
            if (decimalPoints > 1) {
                return false;
            }
            if (!isDecimalPoint && !Character.isDigit(str.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}
