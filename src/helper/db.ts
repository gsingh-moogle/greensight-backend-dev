const db_list = [
    {
        db_name: "lowes_staging",
        db_id: 21,
        user_id: 1,
        tables: [
            {
                t_id: 1,
                tableName: "carriers",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "code",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                ],
            },

            {
                t_id: "2",
                tableName: "carrier_logo",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_code",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "path",
                    },
                ],
            },
            {
                t_id: "3",
                tableName: "company",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "logo",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "4",
                tableName: "decarb_recommendations",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "decarb_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "lane_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "origin",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "destination",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "destination",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "LOB",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "fuel_type",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "emissions",
                    },
                    {
                        coloum_type: "date",
                        coloum_name: "date",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "loaded_miles",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "grs_wgt_qty",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "mpg",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "fuel_use",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "type",
                    },
                    {
                        coloum_type: "enum",
                        coloum_name: "recommended_type",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_code",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_logo",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "5",
                tableName: "emissions",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "destination",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "company_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "load_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "emission",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "total_ton_miles",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "loaded_ton_miles",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "shipments",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "platform",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "date",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_logo",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "6",
                tableName: "facilities",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "state",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "code",
                    },

                ],
            },
            {
                t_id: "7",
                tableName: "projects",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "manager_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "decarb_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "project_name",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "start_date",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "end_date",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "customize_emission",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "emission_percent",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "actual_emission",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "desc",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "enum",
                        coloum_name: "type",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "project_unique_id",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "8",
                tableName: "project_feedbacks",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "project_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "user_id",
                    },
                    {
                        coloum_type: "float",
                        coloum_name: "rating",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "desc",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "9",
                tableName: "project_managers",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "first_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "last_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "email",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "designation",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "services",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "10",
                tableName: "regions",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "user_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "11",
                tableName: "region_target_level",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },

                    {
                        coloum_type: "varchar",
                        coloum_name: "region_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "target_level",
                    },
                    {
                        coloum_type: "date",
                        coloum_name: "date",
                    },

                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "12",
                tableName: "smartway_data",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_name",
                    },

                    {
                        coloum_type: "varchar",
                        coloum_name: "code",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "platform_mode",
                    },
                    {
                        coloum_type: "year",
                        coloum_name: "year",
                    },

                    {
                        coloum_type: "decimal",
                        coloum_name: "intensity",
                    },

                ],
            },
        ],
    },
    {
        db_name: "lowes_prod",
        db_id: 22,
        user_id: 1,
        tables: [
            {
                t_id: 1,
                tableName: "carriers",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "code",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                ],
            },

            {
                t_id: "2",
                tableName: "carrier_logo",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_code",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "path",
                    },
                ],
            },
            {
                t_id: "3",
                tableName: "company",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "logo",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "4",
                tableName: "decarb_recommendations",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "decarb_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "lane_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "origin",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "destination",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "destination",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "LOB",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "fuel_type",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "emissions",
                    },
                    {
                        coloum_type: "date",
                        coloum_name: "date",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "loaded_miles",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "grs_wgt_qty",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "mpg",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "fuel_use",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "type",
                    },
                    {
                        coloum_type: "enum",
                        coloum_name: "recommended_type",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_code",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_logo",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "5",
                tableName: "emissions",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "destination",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "company_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "load_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "emission",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "total_ton_miles",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "loaded_ton_miles",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "shipments",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "platform",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "date",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_logo",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "6",
                tableName: "facilities",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "state",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "code",
                    },

                ],
            },
            {
                t_id: "7",
                tableName: "projects",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "manager_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "decarb_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "project_name",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "start_date",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "end_date",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "customize_emission",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "emission_percent",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "actual_emission",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "desc",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "enum",
                        coloum_name: "type",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "project_unique_id",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "8",
                tableName: "project_feedbacks",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "project_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "user_id",
                    },
                    {
                        coloum_type: "float",
                        coloum_name: "rating",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "desc",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "9",
                tableName: "project_managers",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "first_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "last_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "email",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "designation",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "services",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "10",
                tableName: "regions",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "user_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "11",
                tableName: "region_target_level",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },

                    {
                        coloum_type: "varchar",
                        coloum_name: "region_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "target_level",
                    },
                    {
                        coloum_type: "date",
                        coloum_name: "date",
                    },

                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "12",
                tableName: "smartway_data",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_name",
                    },

                    {
                        coloum_type: "varchar",
                        coloum_name: "code",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "platform_mode",
                    },
                    {
                        coloum_type: "year",
                        coloum_name: "year",
                    },

                    {
                        coloum_type: "decimal",
                        coloum_name: "intensity",
                    },

                ],
            },
        ],
    },
    {
        db_name: "lowes_qa",
        db_id: 23,
        user_id: 1,
        tables: [
            {
                t_id: 1,
                tableName: "carriers",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "code",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                ],
            },

            {
                t_id: "2",
                tableName: "carrier_logo",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_code",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "path",
                    },
                ],
            },
            {
                t_id: "3",
                tableName: "company",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "logo",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "4",
                tableName: "decarb_recommendations",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "decarb_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "lane_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "origin",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "destination",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "destination",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "LOB",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "fuel_type",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "emissions",
                    },
                    {
                        coloum_type: "date",
                        coloum_name: "date",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "loaded_miles",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "grs_wgt_qty",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "mpg",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "fuel_use",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "type",
                    },
                    {
                        coloum_type: "enum",
                        coloum_name: "recommended_type",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_code",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_logo",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "5",
                tableName: "emissions",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "destination",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "company_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "load_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "emission",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "total_ton_miles",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "loaded_ton_miles",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "shipments",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "platform",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "date",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "carrier_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_logo",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "6",
                tableName: "facilities",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "state",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "code",
                    },

                ],
            },
            {
                t_id: "7",
                tableName: "projects",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "manager_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "decarb_id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "project_name",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "start_date",
                    },
                    {
                        coloum_type: "datetime",
                        coloum_name: "end_date",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "customize_emission",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "emission_percent",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "actual_emission",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "desc",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "enum",
                        coloum_name: "type",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "project_unique_id",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "8",
                tableName: "project_feedbacks",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "project_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "user_id",
                    },
                    {
                        coloum_type: "float",
                        coloum_name: "rating",
                    },
                    {
                        coloum_type: "text",
                        coloum_name: "desc",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "9",
                tableName: "project_managers",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "first_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "last_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "email",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "designation",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "services",
                    },
                    {
                        coloum_type: "tinyint",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "10",
                tableName: "regions",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "user_id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "name",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "status",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "11",
                tableName: "region_target_level",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "int",
                        coloum_name: "region_id",
                    },

                    {
                        coloum_type: "varchar",
                        coloum_name: "region_name",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "target_level",
                    },
                    {
                        coloum_type: "date",
                        coloum_name: "date",
                    },

                    {
                        coloum_type: "timestamp",
                        coloum_name: "createdAt",
                    },
                    {
                        coloum_type: "timestamp",
                        coloum_name: "updatedAt",
                    },
                ],
            },
            {
                t_id: "12",
                tableName: "smartway_data",
                columns: [
                    {
                        coloum_type: "int",
                        coloum_name: "id",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "carrier_name",
                    },

                    {
                        coloum_type: "varchar",
                        coloum_name: "code",
                    },
                    {
                        coloum_type: "varchar",
                        coloum_name: "platform_mode",
                    },
                    {
                        coloum_type: "year",
                        coloum_name: "year",
                    },

                    {
                        coloum_type: "decimal",
                        coloum_name: "intensity",
                    },

                ],
            },
        ],
    },
];
module.exports = db_list;
