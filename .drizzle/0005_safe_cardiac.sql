CREATE TABLE `profile` (
	`id` text PRIMARY KEY NOT NULL,
	`display_name` text DEFAULT 'None' NOT NULL,
	`birth_date` text DEFAULT 'None' NOT NULL,
	`email` text NOT NULL,
	`avatar_url` text,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profile_email_unique` ON `profile` (`email`);