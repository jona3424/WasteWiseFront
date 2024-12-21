import { MatPaginatorIntl } from "@angular/material/paginator";

const translations = new MatPaginatorIntl();
      
translations.itemsPerPageLabel = "Measurements per page";
translations.nextPageLabel = "Next page";
translations.previousPageLabel = "Previous page";
translations.getRangeLabel = (page, pageSize, length) => {
	if (length == 0 || pageSize == 0)
	return `0 out of ${length}`;

	length = Math.max(length, 0);

	const startIndex = page * pageSize;
	const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

	return `${startIndex + 1} - ${endIndex} out of ${length}`;
};

export default translations;