
export class CreateHomeDto {
  public name!: string;
  public locality_id!: string;
  public description!: string;
  public display_images!: string[];
  public original_images!: string[];
  public is_active!: boolean;
  public metadata!: any;
  public created_at!: Date;
  public updated_at!: Date;
}
