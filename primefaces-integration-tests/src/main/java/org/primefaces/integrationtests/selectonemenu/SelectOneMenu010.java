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
package org.primefaces.integrationtests.selectonemenu;

import org.primefaces.integrationtests.general.model.Driver;
import org.primefaces.integrationtests.general.service.RealDriverService;
import org.primefaces.integrationtests.general.utilities.TestUtils;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.annotation.PostConstruct;
import jakarta.faces.model.SelectItem;
import jakarta.faces.model.SelectItemGroup;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;

import lombok.Data;

@Named
@ViewScoped
@Data
public class SelectOneMenu010 implements Serializable {

    private static final long serialVersionUID = -7518459955779385834L;

    @Inject
    private RealDriverService driverService;
    private List<SelectItemGroup> drivers;

    private Driver value;

    @PostConstruct
    public void init() {
        drivers = new ArrayList<>();
        for (Driver driver : driverService.getDrivers()) {
            SelectItemGroup group = new SelectItemGroup(driver.getName());
            group.setSelectItems(new SelectItem[]{new SelectItem(driver)});
            drivers.add(group);
        }
    }

    public void onAjax() {
        // pause for 1 second to verify AJAX guards are working properly
        TestUtils.wait(1000);
    }

}
