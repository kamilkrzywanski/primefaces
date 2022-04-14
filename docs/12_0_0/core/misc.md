# Misc

## Servlet Filters

### CharacterEncodingFilter

PrimeFaces provides a CharacterEncodingFilter with default encoding UTF-8.

```xml
<filter>
    <filter-name>Character Encoding Filter</filter-name>
    <filter-class>org.primefaces.webapp.filter.CharacterEncodingFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>Character Encoding Filter</filter-name>
    <servlet-name>Faces Servlet</servlet-name>
</filter-mapping>
```

You can also specify a custom encoding:

```xml
<filter>
    <filter-name>Character Encoding Filter</filter-name>
    <filter-class>org.primefaces.webapp.filter.CharacterEncodingFilter</filter-class>
    <init-param>
        <param-name>encoding</param-name>
        <param-value>UTF-8</param-value>
    </init-param>
</filter>
```
