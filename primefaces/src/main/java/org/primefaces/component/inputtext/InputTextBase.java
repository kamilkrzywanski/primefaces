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
package org.primefaces.component.inputtext;

import org.primefaces.component.api.AbstractPrimeHtmlInputText;
import org.primefaces.component.api.RTLAware;
import org.primefaces.component.api.Widget;
import org.primefaces.component.inputtextarea.InputTextareaBase;

public abstract class InputTextBase extends AbstractPrimeHtmlInputText implements Widget, RTLAware {

    public static final String COMPONENT_FAMILY = "org.primefaces.component";

    public static final String DEFAULT_RENDERER = "org.primefaces.component.InputTextRenderer";

    public enum PropertyKeys {

        placeholder,
        widgetVar,
        counter,
        counterTemplate,
        countBytesAsChars,
    }

    public InputTextBase() {
        setRendererType(DEFAULT_RENDERER);
    }

    @Override
    public String getFamily() {
        return COMPONENT_FAMILY;
    }

    public String getPlaceholder() {
        return (String) getStateHelper().eval(PropertyKeys.placeholder, null);
    }

    public void setPlaceholder(String placeholder) {
        getStateHelper().put(PropertyKeys.placeholder, placeholder);
    }

    public String getWidgetVar() {
        return (String) getStateHelper().eval(PropertyKeys.widgetVar, null);
    }

    public void setWidgetVar(String widgetVar) {
        getStateHelper().put(PropertyKeys.widgetVar, widgetVar);
    }

    public String getCounter() {
        return (String) getStateHelper().eval(PropertyKeys.counter, null);
    }

    public void setCounter(String counter) {
        getStateHelper().put(PropertyKeys.counter, counter);
    }

    public String getCounterTemplate() {
        return (String) getStateHelper().eval(PropertyKeys.counterTemplate, null);
    }

    public void setCounterTemplate(String counterTemplate) {
        getStateHelper().put(PropertyKeys.counterTemplate, counterTemplate);
    }

    public boolean getCountBytesAsChars() {
        return (Boolean) this.getStateHelper().eval(InputTextareaBase.PropertyKeys.countBytesAsChars, false);
    }

    public void setCountBytesAsChars(boolean countBytesAsChars) {
        this.getStateHelper().put(InputTextareaBase.PropertyKeys.countBytesAsChars, countBytesAsChars);
    }
}