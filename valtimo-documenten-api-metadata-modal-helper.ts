import {expect, Page} from '@playwright/test';

export async function fillUploadModal(
    page: Page,
    vertrouwelijkheidaanduiding: string,
    informatieobjecttype: string,
    title: string,
    beschrijving: string,
    status: string
) {
    // === Vertrouwelijkheidaanduiding ===
    const vertrouwelijkheidCombo = page.getByRole('combobox', { name: 'Vertrouwelijkheidaanduiding' });
    await vertrouwelijkheidCombo.waitFor({ state: 'visible' });
    await vertrouwelijkheidCombo.click();

    const vertrouwelijkheidOpt = page.locator('li.cds--list-box__menu-item').filter({
        hasText: vertrouwelijkheidaanduiding,
    });
    await vertrouwelijkheidOpt.first().waitFor({ state: 'visible' });
    await vertrouwelijkheidOpt.first().click();

    // === Informatieobjecttype ===
    const objectTypeBtn = page.getByRole('button', { name: 'Kies het informatieobjecttype' });
    await objectTypeBtn.waitFor({ state: 'visible' });
    await objectTypeBtn.click();

    const objectTypeOpt = page.locator('li.cds--list-box__menu-item').filter({
        hasText: informatieobjecttype,
    });
    await objectTypeOpt.first().waitFor({ state: 'visible' });
    await objectTypeOpt.first().click();

    // === Titel & Beschrijving ===
    if (title || beschrijving) {
        const titelInput = page.getByRole('textbox', { name: 'Titel' });
        const beschrijvingInput = page.getByRole('textbox', { name: 'Beschrijving' });

        await titelInput.waitFor({ state: 'visible' });
        await titelInput.fill(title);

        await beschrijvingInput.waitFor({ state: 'visible' });
        await beschrijvingInput.fill(beschrijving);
    }

    // === Status ===
    const statusCombo = page.getByRole('combobox', { name: 'Kies status' });
    await statusCombo.waitFor({ state: 'visible' });
    await statusCombo.click();

    const statusOpt = page.locator('li.cds--list-box__menu-item').filter({
        hasText: status,
    });
    await statusOpt.first().waitFor({ state: 'visible' });
    await statusOpt.first().click();

    // === Submit ===
    const saveBtn = page.getByRole('button', { name: 'Opslaan' });
    await saveBtn.waitFor({ state: 'attached' });
    await expect(saveBtn).toBeEnabled();
    await saveBtn.click();
}
