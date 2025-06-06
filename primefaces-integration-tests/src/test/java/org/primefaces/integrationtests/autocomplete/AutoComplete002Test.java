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
package org.primefaces.integrationtests.autocomplete;

import org.primefaces.selenium.AbstractPrimePage;
import org.primefaces.selenium.AbstractPrimePageTest;
import org.primefaces.selenium.component.AutoComplete;
import org.primefaces.selenium.component.CommandButton;
import org.primefaces.selenium.component.Messages;
import org.primefaces.selenium.component.model.Msg;

import java.util.List;

import org.json.JSONObject;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.support.FindBy;

import static org.junit.jupiter.api.Assertions.*;

class AutoComplete002Test extends AbstractPrimePageTest {

    @Test
    @Order(1)
    @DisplayName("AutoComplete: completeEndpoint (REST) & POJO")
    void suggestions(Page page) {
        // Arrange
        AutoComplete autoComplete = page.autoComplete;

        // Assert - initial
        assertEquals("Driver No. 4", autoComplete.getValue());

        // Act
        autoComplete.setValueWithoutTab("1");
        autoComplete.wait4Panel();

        // Assert - Part 1
        assertDisplayed(autoComplete.getPanel());
        assertNotNull(autoComplete.getItems());
        List<String> itemValues = autoComplete.getItemValues();
        assertEquals(14, itemValues.size());
        assertEquals("Driver No. 1", itemValues.get(0));
        assertEquals("Driver No. 10", itemValues.get(1));
        assertEquals("Driver No. 19", itemValues.get(10));
        assertEquals("Driver No. 41", itemValues.get(13));

        // Act
        autoComplete.hide();
        autoComplete.setValueWithoutTab("15");
        autoComplete.wait4Panel();

        // Assert - Part 2
        assertDisplayed(autoComplete.getPanel());
        assertNotNull(autoComplete.getItems());
        itemValues = autoComplete.getItemValues();
        assertEquals(1, itemValues.size());
        assertEquals("Driver No. 15", itemValues.get(0));

        // Act
        autoComplete.sendTabKey();
        page.button.click();

        // Assert - Part 3
        assertEquals("Driver No. 15", autoComplete.getValue());
        assertConfiguration(autoComplete.getWidgetConfiguration());

        Msg message = page.messages.getMessage(0);
        assertNotNull(message);
        assertEquals("Driver", message.getSummary());
        assertEquals("id: 15, name: Driver No. 15", message.getDetail());

        assertConfiguration(autoComplete.getWidgetConfiguration());
    }

    private void assertConfiguration(JSONObject cfg) {
        assertNoJavascriptErrors();
        System.out.println("AutoComplete Config = " + cfg);
        assertTrue(cfg.has("appendTo"));
        assertTrue(cfg.has("completeEndpoint"));
        assertTrue(cfg.has("moreText"));
    }

    public static class Page extends AbstractPrimePage {
        @FindBy(id = "form:autocomplete")
        AutoComplete autoComplete;

        @FindBy(id = "form:button")
        CommandButton button;

        @FindBy(id = "form:msgs")
        Messages messages;

        @Override
        public String getLocation() {
            return "autocomplete/autoComplete002.xhtml";
        }
    }
}
