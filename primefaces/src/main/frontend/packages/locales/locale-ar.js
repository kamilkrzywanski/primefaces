import { ar } from "primelocale/js/ar.js";

if (window.PrimeFaces) {
  /** Arabic */
  PrimeFaces.locales["ar"] = ar;

  PrimeFaces.locales["ar"] = $.extend(true, {}, PrimeFaces.locales["ar"], {
    allDayText: "سا ئراليوم",
    day: "اليوم",
    hourText: "ساعة",
    isRTL: true,
    list: "جدول أعمال",
    millisecondText: "ميلي ثانية",
    minuteText: "دقيقة",
    month: "الشهر",
    moreLinkText: "أكثر...",
    noEventsText: "لا أحداث",
    secondText: "ثانية",
    timeOnlyTitle: "الوقت فقط",
    timeText: "الوقت",
    unexpectedError: "خطأ غير متوقع",
    week: "الأسبوع",
    weekNumberTitle: "في",
    year: "سنة",
    yearSuffix: "",
    aria: {
      "colorpicker.ALPHASLIDER": "شريط تمرير التعتيم",
      "colorpicker.CLEAR": "إزالة اللون المحدد",
      "colorpicker.CLOSE": "اغلاق أداة انتقاء اللون",
      "colorpicker.FORMAT": "تنسيق اللون",
      "colorpicker.HUESLIDER": "شريط تمرير درجة اللون",
      "colorpicker.INPUT": "حقل إدخال اللون",
      "colorpicker.INSTRUCTION": "شريط التشبّع والسطوع. للتحكم استخدم أزرار الأسهم أعلى، أسفل، يمين، يسار .",
      "colorpicker.MARKER": "تشبّع: {s}. السطوع: {v}.",
      "colorpicker.OPEN": "فتح أداة انتقاء اللون",
      "colorpicker.SWATCH": "عينة اللون",
      "datatable.sort.ASC": "تفعيل لفرز العمود تصاعديا",
      "datatable.sort.DESC": "تفعيل لفرز العمود تنازليا",
      "datatable.sort.NONE": "قم بالتنشيط لإزالة الفرز على العمود",
      "messages.ERROR": "خطأ",
      "messages.FATAL": "مميت",
      "messages.INFO": "معلومة",
      "messages.WARN": "تحذير",
      "spinner.DECREASE": "إنقاص القيمة",
      "spinner.INCREASE": "زيادة القيمة",
      "switch.OFF": "عن",
      "switch.ON": "على",
    },
    messages: {
      "jakarta.faces.component.UIInput.REQUIRED": "{0}: خطأ في التحقق: القيمة مطلوبة.",
      "jakarta.faces.converter.BigDecimalConverter.DECIMAL": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا عشريًا بعلامة.",
      "jakarta.faces.converter.BigDecimalConverter.DECIMAL_detail": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا عشريًا مُوقعًا يتكون من صفر أو أكثر من الأرقام، والتي يمكن أن تتبعها نقطة عشرية وكسر. مثال 1}.",
      "jakarta.faces.converter.BigIntegerConverter.BIGINTEGER": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا يتكون من رقم واحد أو أكثر.",
      "jakarta.faces.converter.BigIntegerConverter.BIGINTEGER_detail": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا يتكون من رقم واحد أو أكثر. مثال 1}.",
      "jakarta.faces.converter.BooleanConverter.BOOLEAN": "{1}: يجب أن يكون &#39;{0}&#39; &#39;صحيحًا&#39; أو &#39;خطأ&#39;.",
      "jakarta.faces.converter.BooleanConverter.BOOLEAN_detail": "{1}: يجب أن يكون &#39;{0}&#39; &#39;صحيحًا&#39; أو &#39;خطأ&#39;. أي قيمة غير &quot;صحيح&quot; سيتم تقييمها على أنها &quot;خطأ&quot;.",
      "jakarta.faces.converter.ByteConverter.BYTE": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا بين 0 و255.",
      "jakarta.faces.converter.ByteConverter.BYTE_detail": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا بين 0 و255. مثال: {1}.",
      "jakarta.faces.converter.CharacterConverter.CHARACTER": "{1}: يجب أن يكون &#39;{0}&#39; حرفًا صالحًا.",
      "jakarta.faces.converter.CharacterConverter.CHARACTER_detail": "{1}: يجب أن يكون &#39;{0}&#39; حرف ASCII صالحًا.",
      "jakarta.faces.converter.DateTimeConverter.DATE": "{2}: لا يمكن فهم &#39;{0}&#39; كتاريخ.",
      "jakarta.faces.converter.DateTimeConverter.DATE_detail": "{2}: لا يمكن فهم &#39;{0}&#39; كتاريخ. مثال 1}.",
      "jakarta.faces.converter.DateTimeConverter.DATETIME": "{2}: لا يمكن فهم &#39;{0}&#39; كتاريخ ووقت.",
      "jakarta.faces.converter.DateTimeConverter.DATETIME_detail": "{2}: لا يمكن فهم &#39;{0}&#39; كتاريخ ووقت. مثال 1}.",
      "jakarta.faces.converter.DateTimeConverter.PATTERN_TYPE": "{1}: يجب تحديد سمة &#39;نمط&#39; أو &#39;نوع&#39; لتحويل القيمة &#39;{0}&#39;.",
      "jakarta.faces.converter.DateTimeConverter.TIME": "{2}: لا يمكن فهم &#39;{0}&#39; كوقت.",
      "jakarta.faces.converter.DateTimeConverter.TIME_detail": "{2}: لا يمكن فهم &#39;{0}&#39; كوقت. مثال 1}.",
      "jakarta.faces.converter.DoubleConverter.DOUBLE": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا يتكون من رقم واحد أو أكثر.",
      "jakarta.faces.converter.DoubleConverter.DOUBLE_detail": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا بين 4.9E-324 و1.7976931348623157E308. مثال 1}.",
      "jakarta.faces.converter.FloatConverter.FLOAT": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا يتكون من رقم واحد أو أكثر.",
      "jakarta.faces.converter.FloatConverter.FLOAT_detail": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا بين 1.4E-45 و3.4028235E38 مثال: {1}.",
      "jakarta.faces.converter.IntegerConverter.INTEGER": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا يتكون من رقم واحد أو أكثر.",
      "jakarta.faces.converter.IntegerConverter.INTEGER_detail": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا بين -2147483648 و2147483647. مثال: {1}.",
      "jakarta.faces.converter.NumberConverter.CURRENCY": "{2}: لا يمكن فهم &#39;{0}&#39; كقيمة عملة.",
      "jakarta.faces.converter.NumberConverter.CURRENCY_detail": "{2}: لا يمكن فهم &#39;{0}&#39; كقيمة عملة. مثال 1}.",
      "jakarta.faces.converter.NumberConverter.NUMBER": "{2}: لا يمكن فهم &#39;{0}&#39; كرقم.",
      "jakarta.faces.converter.NumberConverter.NUMBER_detail": "{2}: لا يمكن فهم &#39;{0}&#39; كرقم. مثال 1}.",
      "jakarta.faces.converter.NumberConverter.PATTERN": "{2}: لا يمكن فهم &#39;{0}&#39; كنمط رقمي.",
      "jakarta.faces.converter.NumberConverter.PATTERN_detail": "{2}: لا يمكن فهم &#39;{0}&#39; كنمط رقمي. مثال 1}.",
      "jakarta.faces.converter.NumberConverter.PERCENT": "{2}: لا يمكن فهم &#39;{0}&#39; كنسبة مئوية.",
      "jakarta.faces.converter.NumberConverter.PERCENT_detail": "{2}: لا يمكن فهم &#39;{0}&#39; كنسبة مئوية. مثال 1}.",
      "jakarta.faces.converter.ShortConverter.SHORT": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا يتكون من رقم واحد أو أكثر.",
      "jakarta.faces.converter.ShortConverter.SHORT_detail": "{2}: يجب أن يكون &#39;{0}&#39; رقمًا بين -32768 و32767. مثال: {1}.",
      "jakarta.faces.validator.BeanValidator.MESSAGE": "{1}: {0}",
      "jakarta.faces.validator.DoubleRangeValidator.MAXIMUM": "{1}: خطأ في التحقق من الصحة: القيمة أكبر من الحد الأقصى المسموح به وهو &#39;{0}&#39;.",
      "jakarta.faces.validator.DoubleRangeValidator.MINIMUM": "{1}: خطأ في التحقق من الصحة: القيمة أقل من الحد الأدنى المسموح به وهو &#39;{0}&#39;.",
      "jakarta.faces.validator.DoubleRangeValidator.NOT_IN_RANGE": "{2}: خطأ في التحقق من الصحة: السمة المحددة ليست بين القيم المتوقعة لـ {0} و{1}.",
      "jakarta.faces.validator.DoubleRangeValidator.TYPE": "{0}: خطأ في التحقق من الصحة: القيمة ليست من النوع الصحيح.",
      "jakarta.faces.validator.LengthValidator.MAXIMUM": "{1}: خطأ في التحقق من الصحة: الطول أكبر من الحد الأقصى المسموح به وهو &#39;{0}&#39;.",
      "jakarta.faces.validator.LengthValidator.MINIMUM": "{1}: خطأ في التحقق: الطول أقل من الحد الأدنى المسموح به وهو &#39;{0}&#39;.",
      "jakarta.faces.validator.LongRangeValidator.MAXIMUM": "{1}: خطأ في التحقق من الصحة: القيمة أكبر من الحد الأقصى المسموح به وهو &#39;{0}&#39;.",
      "jakarta.faces.validator.LongRangeValidator.MINIMUM": "{1}: خطأ في التحقق من الصحة: القيمة أقل من الحد الأدنى المسموح به وهو &#39;{0}&#39;.",
      "jakarta.faces.validator.LongRangeValidator.NOT_IN_RANGE": "{2}: خطأ في التحقق من الصحة: السمة المحددة ليست بين القيم المتوقعة لـ {0} و{1}.",
      "jakarta.faces.validator.LongRangeValidator.TYPE": "{0}: خطأ في التحقق من الصحة: القيمة ليست من النوع الصحيح.",
      "jakarta.faces.validator.RegexValidator.MATCH_EXCEPTION": "خطأ في التعبير العادي.",
      "jakarta.faces.validator.RegexValidator.MATCH_EXCEPTION_detail": "خطأ في التعبير العادي، &#39;{0}&#39;.",
      "jakarta.faces.validator.RegexValidator.NOT_MATCHED": "نمط Regex غير متطابق.",
      "jakarta.faces.validator.RegexValidator.NOT_MATCHED_detail": "نمط التعبير العادي لـ &#39;{0}&#39; غير متطابق.",
      "jakarta.faces.validator.RegexValidator.PATTERN_NOT_SET": "يجب تعيين نمط Regex.",
      "jakarta.faces.validator.RegexValidator.PATTERN_NOT_SET_detail": "يجب ضبط نمط Regex على قيمة غير فارغة.",
      "jakarta.validation.constraints.AssertFalse.message": "يجب أن تكون كاذبة",
      "jakarta.validation.constraints.AssertTrue.message": "يجب أن يكون صحيحا",
      "jakarta.validation.constraints.DecimalMax.message": "يجب أن يكون أقل من أو يساوي {0}",
      "jakarta.validation.constraints.DecimalMin.message": "يجب أن يكون أكبر من أو يساوي {0}",
      "jakarta.validation.constraints.Digits.message": "قيمة رقمية خارج الحدود (&lt;{0} أرقام&gt;.&lt;{1} أرقام&gt; متوقعة)",
      "jakarta.validation.constraints.Email.message": "يجب أن يكون عنوان بريد إلكتروني جيد التصميم",
      "jakarta.validation.constraints.Future.message": "يجب أن يكون تاريخا في المستقبل",
      "jakarta.validation.constraints.FutureOrPresent.message": "يجب أن يكون تاريخا في الحاضر أو في المستقبل",
      "jakarta.validation.constraints.Max.message": "يجب أن يكون أقل من أو يساوي {0}",
      "jakarta.validation.constraints.Min.message": "يجب أن يكون أكبر من أو يساوي {0}",
      "jakarta.validation.constraints.Negative.message": "يجب أن يكون أقل من 0",
      "jakarta.validation.constraints.NegativeOrZero.message": "يجب أن يكون أقل من أو يساوي 0",
      "jakarta.validation.constraints.NotBlank.message": "يجب ألا يكون فارغًا",
      "jakarta.validation.constraints.NotEmpty.message": "يجب ألا تكون فارغة",
      "jakarta.validation.constraints.NotNull.message": "يجب ألا تكون فارغة",
      "jakarta.validation.constraints.Null.message": "يجب أن تكون فارغة",
      "jakarta.validation.constraints.Past.message": "يجب أن يكون تاريخا الماضي",
      "jakarta.validation.constraints.PastOrPresent.message": "يجب أن يكون تاريخا في الماضي أو في الوقت الحاضر",
      "jakarta.validation.constraints.Pattern.message": "يجب أن يتطابق مع &#39;{0}&#39;",
      "jakarta.validation.constraints.Positive.message": "يجب أن يكون أكبر من 0",
      "jakarta.validation.constraints.PositiveOrZero.message": "يجب أن يكون أكبر من أو يساوي 0",
      "jakarta.validation.constraints.Size.message": "يجب أن يتراوح الحجم بين {0} و{1}",
      "primefaces.FileValidator.ALLOW_TYPES": "نوع الملف غير صالح.",
      "primefaces.FileValidator.ALLOW_TYPES_detail": "نوع الملف غير صالح: &#39;{0}&#39;. الأنواع المسموح بها: &#39;{1}&#39;.",
      "primefaces.FileValidator.FILE_LIMIT": "تم تجاوز الحد الأقصى لعدد الملفات.",
      "primefaces.FileValidator.FILE_LIMIT_detail": "الحد الأقصى للعدد: {0}.",
      "primefaces.FileValidator.SIZE_LIMIT": "حجم الملف غير صالح.",
      "primefaces.FileValidator.SIZE_LIMIT_detail": "يجب ألا يكون الملف &#39;{0}&#39; أكبر من {1}.",
    },
  });
  // Arab Tunisian
  PrimeFaces.locales["ar_TN"] = $.extend(true, {}, PrimeFaces.locales["ar"], {
    fileSizeTypes: ["بايت", "كيلو بايت", "ميقا بايت", "جيقا بايت", "تيرا بايت", "بيتا بايت", "إكسا بايت", "زيتا بايت", "يوتا بايت"],
    monthNames: ["جانفي", "فيفري", "مارس", "افريل", "ماي", "جوان", "جويلية", "اوت", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"],
    monthNamesShort: ["جانفي", "فيفري", "مارس", "افريل", "ماي", "جوان", "جويلية", "اوت", "سبتمبر", "اكتوبر", "نوفمبر", "ديسمبر"],
  });
}
